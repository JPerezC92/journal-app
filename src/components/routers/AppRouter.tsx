import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { firebase } from "../../firebase";
import { authActions, startLoadingNotes } from "../../reducers";
import { RootState } from "../../store/store";
import JournalScreen from "../journal/JournalScreen";
import AuthRouter from "./AuthRouter";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
  const dispatch = useDispatch();
  const { authReducer: auth } = useSelector((state: RootState) => state);

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(
          authActions.login({ uid: user.uid, displayName: user.displayName })
        );

        dispatch(startLoadingNotes(user.uid));
      }
      setChecking(() => false);
    });
    return () => {};
  }, [dispatch]);

  if (checking) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute
          path="/auth"
          isAuthenticated={auth.user.isLoggedIn}
          Component={AuthRouter}
        />

        <PrivateRoute
          exact
          path="/"
          isAuthenticated={auth.user.isLoggedIn}
          Component={JournalScreen}
        />
        <Redirect to="/auth/login" />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
