import { store } from "../../store/store";
import { authActions } from "./authReducer";

describe("Test on authReducer", () => {
  test("should login the user", () => {
    let state = store.getState();

    const userInfo = {
      displayName: "Philip",
      uid: "JKZHKJSDFNBASJKDASdklfhakjh",
    };

    store.dispatch(authActions.login(userInfo));
    state = store.getState();
    expect(state.authReducer.user).toEqual({
      isLoggedIn: true,
      ...userInfo,
    });
  });

  test("should logout the user", () => {
    let state = store.getState();

    const userInfo = {
      displayName: "Philip",
      uid: "JKZHKJSDFNBASJKDASdklfhakjh",
    };
    store.dispatch(authActions.login(userInfo));
    store.dispatch(authActions.logout());

    state = store.getState();
    expect(state.authReducer.user).toEqual({
      isLoggedIn: false,
    });
  });
});
