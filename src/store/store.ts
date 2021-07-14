import { configureStore } from "@reduxjs/toolkit";
import { uiReducer, authReducer } from "../reducers";

export const store = configureStore({
  reducer: {
    authReducer,
    uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
