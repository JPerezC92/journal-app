import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Loading } from "../authReducer";

interface InitialStateRegiserReducer {
  loading: Loading;
  errorMessage: string | null;
}

const initialState = {
  loading: Loading.IDLE,
  errorMessage: null,
} as InitialStateRegiserReducer;

const UISlice = createSlice({
  name: "[UI]",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
      state.loading = Loading.PENDING;
    },
    removeError: () => ({ loading: Loading.IDLE, errorMessage: null }),
  },
});
export const uiActions = UISlice.actions;

export const uiReducer = UISlice.reducer;
