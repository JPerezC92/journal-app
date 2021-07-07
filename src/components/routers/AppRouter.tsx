import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import JournalScreen from "../journal/JournalScreen";
import AuthRouter from "./AuthRouter";

const AppRouter = () => {
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
