import { useDispatch } from "react-redux";
import { startLogout } from "../reducers";

interface UseAuthentication {
  (): { handleLogout: () => void };
}

export const useAuthentication: UseAuthentication = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };
  return { handleLogout };
};
