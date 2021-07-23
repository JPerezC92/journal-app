import { firebase } from "../../firebase";
import { AuthService } from "../../services";
import { store } from "../../store/store";
import { startRegister, startLogin, startLogout } from "./authThunks";

describe("Test on authReducer", () => {
  let state = store.getState();
  let dispatch = store.dispatch;

  //   beforeEach(() => {
  //     state = store.getState();
  //   });

  afterEach(async () => {
    await dispatch(startLogout());
  });

  test("startRegister should register a new user", async () => {
    await dispatch(
      startRegister({
        name: "testRegister",
        email: "registerTest@testing.com",
        password: "123456",
      })
    );

    state = store.getState();

    expect(state.authReducer.user.displayName).toBe("testRegister");
    expect(state.authReducer.user.isLoggedIn).toBeTruthy();

    firebase.auth().currentUser?.delete();
  });

  test("startLogin should authenticate a user, startLogout should log out the current user", async () => {
    await dispatch(
      startLogin(() =>
        AuthService.loginWithEmailAndPassword("test@testing.com", "123456")
      )
    );

    state = store.getState();

    expect(state.authReducer.user.isLoggedIn).toBe(true);
    expect(state.authReducer.user.uid).toBe("hKNStlAarlTwrGB7pvHzBPElOCG2");

    await dispatch(startLogout());
    state = store.getState();

    expect(state.authReducer.user.isLoggedIn).toBe(false);
  });
});
