import {
  AnyAction,
  CombinedState,
  combineReducers,
  configureStore,
  createSlice,
} from "@reduxjs/toolkit";
import { reducers } from "../store/store";

const storeCleanSlice = createSlice({
  name: "store",
  initialState: {},
  reducers: {
    clean: () => {},
  },
});

export const storeCleanActions = storeCleanSlice.actions;
const storeCleanReducer = storeCleanSlice.reducer;
const combinedReducers = combineReducers({ ...reducers, storeCleanReducer });

const testReducers = (
  state: CombinedState<any> | undefined,
  action: AnyAction
) => {
  if (action.type === "store/clean") {
    state = undefined;
  }
  return combinedReducers(state, action);
};

export const mockStore = configureStore({
  reducer: testReducers,
});

export type MockRootState = ReturnType<typeof mockStore.getState>;
export type MockAppDispatch = typeof mockStore.dispatch;
