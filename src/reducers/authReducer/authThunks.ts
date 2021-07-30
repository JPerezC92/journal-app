import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { firebase } from "../../firebase";
import { Types } from "../../types/types";
import { notesActions } from "../notesReducer";
import { uiActions } from "../uiReducer";
import { authActions, User } from "./authReducer";

export const startLogin = createAsyncThunk<void, () => Promise<User>>(
  Types.AUTH_LOGIN,
  async (loginCallback, { dispatch }) => {
    try {
      dispatch(uiActions.uiStartLoading());
      await loginCallback();
      dispatch(uiActions.uiFinishLoading());
    } catch (error) {
      console.log(error);
      dispatch(uiActions.uiFinishLoading());
      Swal.fire("Error", error.message, "error");
    }
  }
);

export const startLogout = createAsyncThunk(
  Types.AUTH_LOGOUT,
  async (_, { dispatch }) => {
    await firebase.auth().signOut();

    dispatch(authActions.logout());
    dispatch(notesActions.notesLogoutCleaning());
  }
);

export const startRegister = createAsyncThunk<
  void,
  {
    email: string;
    password: string;
    name: string;
  }
>(Types.AUTH_REGISTER, async (args, { dispatch }) => {
  dispatch(uiActions.uiStartLoading());
  const { email, password, name } = args;

  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async ({ user }) => {
      await user?.updateProfile({ displayName: name });
      const { displayName, uid } = user!;

      dispatch(authActions.login({ displayName, uid }));
      dispatch(uiActions.uiFinishLoading());
    })
    .catch((error) => {
      if (process.env.NODE_ENV !== "test") console.log(error);
      dispatch(uiActions.uiFinishLoading());
      Swal.fire("Error", error.message, "error");
    });
});
