import { mockStore } from "../../test-utils/mockStore";
import { uiActions } from "./uiReducer";

describe("Test on uiReducer", () => {
  test("all actions should work", () => {
    let state = mockStore.getState();
    let dispatch = mockStore.dispatch;

    // set error
    dispatch(uiActions.setError("An error ocurred"));
    state = mockStore.getState();
    expect(state.uiReducer.errorMessage).toBe("An error ocurred");

    // remove error
    dispatch(uiActions.removeError());
    state = mockStore.getState();
    expect(state.uiReducer.errorMessage).toBe(null);

    // loading true
    dispatch(uiActions.uiStartLoading());
    state = mockStore.getState();
    expect(state.uiReducer.loading).toBe(true);

    // loading false
    dispatch(uiActions.uiFinishLoading());
    state = mockStore.getState();
    expect(state.uiReducer.loading).toBe(false);
  });
});
