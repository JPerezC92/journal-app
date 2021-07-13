import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { User } from "../reducers/authReducer";

export enum Login {
  WITH_EMAIL_AND_PASSWORD = "WITH_EMAIL_AND_PASSWORD",
  WITH_FIREBASE = "WITH_FIREBASE",
}

export interface LoginArgs {
  type: Login;
  credentials?: { email: string; password: string };
}

export class LoginService {
  static async withEmailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User> {
    const pro = () => {
      return new Promise<User>((resolve, reject) => {
        setTimeout(() => {
          return resolve({
            isLoggedIn: true,
            displayName: "Philip",
            uid: "dasdasds",
          });
        }, 3500);
      });
    };

    return pro();
  }

  static async withFirebase(): Promise<User> {
    const userCred = await firebase.auth().signInWithPopup(googleAuthProvider);

    const { displayName, uid } = userCred.user!;

    return { isLoggedIn: true, displayName: displayName || "", uid };
  }
}
