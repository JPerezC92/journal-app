import { configureStore } from "@reduxjs/toolkit";
import { uiReducer, authReducer, notesReducer } from "../reducers";

export const store = configureStore({
  reducer: {
    authReducer,
    uiReducer,
    notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
