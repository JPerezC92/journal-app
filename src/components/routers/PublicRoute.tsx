import React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";

interface Props {
  Component: React.FC<RouteComponentProps>;
  isAuthenticated: boolean;
  path: string;
}

const PublicRoute = ({ isAuthenticated, Component, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PublicRoute;
