import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";

interface Props extends RouteProps {
  isAuthenticated: boolean;
  path: string;
  Component: React.FC<RouteComponentProps>;
  exact?: boolean;
}

const PrivateRoute = ({ isAuthenticated, Component, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
