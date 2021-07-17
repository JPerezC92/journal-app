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

export enum AuthThunkTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  REGISTER = "REGISTER",
}
