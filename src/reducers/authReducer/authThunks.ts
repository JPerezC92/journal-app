import { createAsyncThunk } from "@reduxjs/toolkit";
import { firebase } from "../../firebase/firebase-config";
import { authActions } from "./authReducer";
import { AuthThunkTypes, User } from "./authReducerTypes";

export const startLogin = createAsyncThunk<void, () => Promise<User>>(
  AuthThunkTypes.LOGIN,
  async (loginCallback, { dispatch }) => {
    const user = await loginCallback();

    dispatch(authActions.login(user));
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
  const { email, password, name } = args;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async ({ user }) => {
      await user?.updateProfile({ displayName: name });
      const { displayName, uid } = user!;

      dispatch(authActions.login({ displayName, uid }));
    })
    .catch((e) => {
      console.log(e);
    });
});
