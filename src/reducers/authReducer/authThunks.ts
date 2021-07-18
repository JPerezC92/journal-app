import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { firebase } from "../../firebase";
import { uiActions } from "../uiReducer";
import { authActions } from "./authReducer";
import { AuthThunkTypes, User } from "./authReducerTypes";

export const startLogin = createAsyncThunk<void, () => Promise<User>>(
  AuthThunkTypes.LOGIN,
  async (loginCallback, { dispatch }) => {
    try {
      dispatch(uiActions.uiStartLoading());
      const user = await loginCallback();

      dispatch(authActions.login(user));
      dispatch(uiActions.uiFinishLoading());
    } catch (error) {
      console.log(error);
      dispatch(uiActions.uiFinishLoading());
      Swal.fire("Error", error.message, "error");
    }
  }
);

export const startLogout = createAsyncThunk(
  AuthThunkTypes.LOGOUT,
  async (_, { dispatch }) => {
    await firebase.auth().signOut();

    dispatch(authActions.logout());
  }
);

export const register = createAsyncThunk<
  void,
  {
    email: string;
    password: string;
    name: string;
  }
>(AuthThunkTypes.REGISTER, async (args, { dispatch }) => {
  dispatch(uiActions.uiStartLoading());
  const { email, password, name } = args;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async ({ user }) => {
      await user?.updateProfile({ displayName: name });
      const { displayName, uid } = user!;

      dispatch(authActions.login({ displayName, uid }));
      dispatch(uiActions.uiFinishLoading());
    })
    .catch((error) => {
      console.log(error);
      dispatch(uiActions.uiFinishLoading());
      Swal.fire("Error", error.message, "error");
    });
});
