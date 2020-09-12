import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const isLogin = localStorage.getItem("login") && true;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isLogin ? <Component {...routeProps} /> : <Redirect to="/signin" />
      }
    />
  );
}

export default PrivateRoute;
