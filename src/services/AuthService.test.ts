import { firebase } from "../firebase";
import { AuthService } from "./AuthService";

describe("Test on AuthService", () => {
  test("should call firebase.auth().signInWithEmailAndPassword and return an user:User", async () => {
    jest.spyOn(firebase.auth(), "signInWithEmailAndPassword");
    const user = await AuthService.loginWithEmailAndPassword(
      "test@testing.com",
      "123456"
    );

    expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalledWith(
      "test@testing.com",
      "123456"
    );
    expect(user).toEqual({
      displayName: "testingAccount",
      isLoggedIn: true,
      uid: "UO0hZ06iY3V0yfn5IAQZXGPmPun1",
    });
  });
});
