import { useDispatch } from "react-redux";
import { startLogin, startLogout } from "../reducers";
import { AuthService } from "../services";

interface UseAuthentication {
  (): {
    handleLogout: () => void;
    handleLoginWithEmailAndPassword: (email: string, password: string) => void;
    handleGoogleLogin: () => void;
  };
}

export const useAuthentication: UseAuthentication = () => {
  const dispatch = useDispatch();

  const handleLoginWithEmailAndPassword = (email: string, password: string) => {
    dispatch(
      startLogin(() => AuthService.loginWithEmailAndPassword(email, password))
    );
  };

  const handleGoogleLogin = () => {
    dispatch(startLogin(AuthService.loginWithGoogle));
  };

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return { handleLogout, handleGoogleLogin, handleLoginWithEmailAndPassword };
};
