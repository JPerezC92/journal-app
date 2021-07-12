import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isLoggedIn: boolean;
  displayName: string;
  uuid: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
} as AuthState;

export const authSlice = createSlice({
  name: "[Auth]",
  initialState,
  reducers: {
    login: (_, action: PayloadAction<AuthState>): AuthState => action.payload,
    logout: () => initialState,
  },
});

export const { login, logout } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
