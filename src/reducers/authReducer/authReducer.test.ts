import { mockStore } from "../../test-utils/mockStore";
import { authActions } from "./authReducer";

describe("Test on authReducer", () => {
  let dispatch = mockStore.dispatch;
  let state = mockStore.getState();

  beforeEach(() => {
    dispatch = mockStore.dispatch;
  });

  test("should login the user", () => {
    const userInfo = {
      displayName: "Philip",
      uid: "JKZHKJSDFNBASJKDASdklfhakjh",
    };

    dispatch(authActions.login(userInfo));

    state = mockStore.getState();

    expect(state.authReducer.user).toEqual({
      isLoggedIn: true,
      ...userInfo,
    });
  });

  test("should logout the user", () => {
    const userInfo = {
      displayName: "Philip",
      uid: "JKZHKJSDFNBASJKDASdklfhakjh",
    };
    dispatch(authActions.login(userInfo));
    dispatch(authActions.logout());

    state = mockStore.getState();

    expect(state.authReducer.user).toEqual({
      isLoggedIn: false,
    });
  });
});
