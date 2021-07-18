import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { firebase } from "../../firebase";
import { authActions } from "../../reducers";
import JournalScreen from "../journal/JournalScreen";
import AuthRouter from "./AuthRouter";

const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(
          authActions.login({ uid: user.uid, displayName: user.displayName })
        );
      }
      setChecking(() => false);
    });
    return () => {};
  }, [dispatch]);

  if (checking) return <div>Loading...</div>;
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth" component={AuthRouter} />
        <Route exact path="/" component={JournalScreen} />
        <Redirect to="/auth/login" />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
