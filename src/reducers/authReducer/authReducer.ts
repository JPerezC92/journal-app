import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "./authReducerTypes";
import { startLogin, register } from "./authThunks";

const initialState = {
  user: { isLoggedIn: false },
  currentRequestId: undefined,
  error: null,
} as AuthState;

export const authSlice = createSlice({
  name: "[AUTH]",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Omit<User, "isLoggedIn">>) => {
      const { displayName, uid } = action.payload;

      state.user = {
        isLoggedIn: true,
        displayName,
        uid,
      };
    },
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(startLogin.pending, (state, action) => {
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(startLogin.fulfilled, () => {})
      .addCase(register.fulfilled, (state, action) => {});
  },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;
