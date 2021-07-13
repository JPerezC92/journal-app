import { createSlice } from "@reduxjs/toolkit";
import { AuthState, Loading } from "./authReducerTypes";
import { login } from "./authThunks";

const initialState = {
  user: { isLoggedIn: false },
  loading: Loading.IDLE,
  currentRequestId: undefined,
  error: null,
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        if (state.loading === Loading.IDLE) {
          state.loading = Loading.PENDING;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = Loading.IDLE;
      });
    // .addCase(startGoogleLogin.fulfilled, (state, action) => {
    //   state.user = action.payload.user;
    // });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
