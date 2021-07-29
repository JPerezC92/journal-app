import { useDispatch } from "react-redux";
import { startLogout } from "../reducers";

type UseAuthentication = () => {
  handleLogout: () => void;
};

export const useAuthentication: UseAuthentication = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };
  return { handleLogout };
};
