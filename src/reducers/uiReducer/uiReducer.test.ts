import { store } from "../../store/store";
import { uiActions } from "./uiReducer";

describe("Test on uiReducer", () => {
  test("all actions should work", () => {
    let state = store.getState();
    let dispatch = store.dispatch;

    // set error
    dispatch(uiActions.setError("An error ocurred"));
    state = store.getState();
    expect(state.uiReducer.errorMessage).toBe("An error ocurred");

    // remove error
    dispatch(uiActions.removeError());
    state = store.getState();
    expect(state.uiReducer.errorMessage).toBe(null);

    // loading true
    dispatch(uiActions.uiStartLoading());
    state = store.getState();
    expect(state.uiReducer.loading).toBe(true);

    // loading false
    dispatch(uiActions.uiFinishLoading());
    state = store.getState();
    expect(state.uiReducer.loading).toBe(false);
  });
});
