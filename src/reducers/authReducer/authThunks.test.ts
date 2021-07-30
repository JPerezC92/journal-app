import Swal from "sweetalert2";
import { firebase } from "../../firebase";
import { AuthService } from "../../services";
import { mockStore, storeCleanActions } from "../../test-utils/mockStore";
import { notesActions } from "../notesReducer";
import { uiActions } from "../uiReducer";
import { authActions } from "./authReducer";
import { startRegister, startLogin, startLogout } from "./authThunks";

describe("Test on authReducer", () => {
  let dispatch = mockStore.dispatch;
  let state = mockStore.getState();

  afterEach(() => {
    dispatch(storeCleanActions.clean());
    jest.restoreAllMocks();
  });

  test("startRegister should register a new user", async () => {
    jest.spyOn(authActions, "login");
    jest.spyOn(uiActions, "uiStartLoading");
    jest.spyOn(uiActions, "uiFinishLoading");

    state = mockStore.getState();
    expect(state.authReducer.user.isLoggedIn).toBeFalsy();

    await dispatch(
      startRegister({
        name: "testRegister",
        email: "testregister@testing.com",
        password: "123456",
      })
    );

    state = mockStore.getState();
    expect(uiActions.uiStartLoading).toHaveBeenCalledTimes(1);
    expect(uiActions.uiFinishLoading).toHaveBeenCalledTimes(1);
    expect(authActions.login).toHaveBeenCalledTimes(1);
    expect(authActions.login).toHaveBeenCalledWith({
      displayName: "testRegister",
      uid: expect.any(String),
    });
    expect(state.authReducer.user.displayName).toBe("testRegister");
    expect(state.authReducer.user.isLoggedIn).toBeTruthy();

    await firebase.auth().currentUser?.delete();
  });

  test("when startRegister fail should call uiActions.uiFinishLoading", async () => {
    jest.spyOn(uiActions, "uiFinishLoading");
    jest.spyOn(Swal, "fire");

    state = mockStore.getState();
    expect(state.authReducer.user.isLoggedIn).toBeFalsy();

    await dispatch(
      startRegister({
        name: "",
        email: "",
        password: "",
      })
    );

    expect(uiActions.uiFinishLoading).toHaveBeenCalledTimes(1);
    expect(Swal.fire).toHaveBeenCalledTimes(1);
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      expect.any(String),
      "error"
    );
  });

  test("startLogin should call AuthService.loginWithEmailAndPassword, uiActions", async () => {
    jest.spyOn(uiActions, "uiStartLoading");
    jest.spyOn(uiActions, "uiFinishLoading");
    jest.spyOn(AuthService, "loginWithEmailAndPassword");

    await dispatch(
      startLogin(() =>
        AuthService.loginWithEmailAndPassword("test@testing.com", "123456")
      )
    );

    expect(uiActions.uiStartLoading).toHaveBeenCalledTimes(1);
    expect(uiActions.uiFinishLoading).toHaveBeenCalledTimes(1);
    expect(AuthService.loginWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(AuthService.loginWithEmailAndPassword).toHaveBeenCalledWith(
      "test@testing.com",
      "123456"
    );
  });

  test("startLogout should log out the current user", async () => {
    jest.spyOn(authActions, "logout");
    jest.spyOn(firebase.auth(), "signOut");
    jest.spyOn(notesActions, "notesLogoutCleaning");

    dispatch(
      authActions.login({
        displayName: "TESTING",
        uid: "JKZHKJSDFNBASJKDASdklfhakjh",
      })
    );
    state = mockStore.getState();
    expect(state.authReducer.user.isLoggedIn).toBeTruthy();

    await dispatch(startLogout());
    state = mockStore.getState();

    expect(state.authReducer.user.isLoggedIn).toBeFalsy();
    expect(firebase.auth().signOut).toHaveBeenCalledTimes(1);
    expect(authActions.logout).toHaveBeenCalledTimes(1);
    expect(notesActions.notesLogoutCleaning).toHaveBeenCalledTimes(1);
  });
});
