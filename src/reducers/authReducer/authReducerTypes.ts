export enum Loading {
  IDLE = "IDLE",
  PENDING = "PENDING",
}

export interface User {
  isLoggedIn: boolean;
  displayName: string;
  uid: string;
}

export interface AuthState {
  user: User;
  loading: Loading;
  currentRequestId: string | undefined;
  error: string | null;
}

export interface LoginResponse {
  user: User;
  sucess: boolean;
}

export enum AuthThunkTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}
