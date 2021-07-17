import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { User } from "../reducers/authReducer";

export class AuthService {
  static async loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<User> {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    return {
      isLoggedIn: true,
      displayName: user!.displayName!,
      uid: user?.uid!,
    };
  }

  static async loginWithFirebase(): Promise<User> {
    const userCred = await firebase.auth().signInWithPopup(googleAuthProvider);

    const { displayName, uid } = userCred.user!;

    return { isLoggedIn: true, displayName: displayName || "", uid };
  }
}
