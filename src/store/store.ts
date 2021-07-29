import { configureStore } from "@reduxjs/toolkit";
import { uiReducer, authReducer, notesReducer } from "../reducers";

export const reducers = {
  authReducer,
  uiReducer,
  notesReducer,
};

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
