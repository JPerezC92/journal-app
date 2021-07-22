import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startLogin } from "./authThunks";

export interface User {
  isLoggedIn: boolean;
  displayName: string | null;
  uid: string;
}

export interface AuthState {
  user: User;
  currentRequestId: string | undefined;
  error: string | null;
}

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
      return state;
    },
    logout: (state) => (state = initialState),
  },
  extraReducers: (builder) => {
    builder.addCase(startLogin.pending, (state, action) => {
      state.currentRequestId = action.meta.requestId;
    });
  },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;
