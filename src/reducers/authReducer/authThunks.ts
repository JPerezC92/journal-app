import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthThunkTypes, LoginResponse, User } from "./authReducerTypes";

export const login = createAsyncThunk<LoginResponse, () => Promise<User>>(
  AuthThunkTypes.LOGIN,
  async (loginCallback) => {
    const user = await loginCallback();
    return { user, sucess: true };
  }
);
