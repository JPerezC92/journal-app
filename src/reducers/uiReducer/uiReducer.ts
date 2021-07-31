import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIReducerState {
  loading: boolean;
  errorMessage: string | null;
}

const initialState = {
  loading: false,
  errorMessage: null,
} as UIReducerState;

const UISlice = createSlice({
  name: "[UI]",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    removeError: (state) => {
      state.errorMessage = null;
    },
    uiStartLoading: (state) => {
      state.loading = true;
    },
    uiFinishLoading: (state) => {
      state.loading = false;
    },
  },
});
export const uiActions = UISlice.actions;

export const uiReducer = UISlice.reducer;
