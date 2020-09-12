import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import DashBoard from "./layout/DashBoard";
import SignIn from "./layout/SignIn";
import SignUp from "./layout/SignUp";
import Default from "./layout/Default";
import PrivateRoute from "./router/PrivateRoute";
import { ChatAppProvider } from "./context/context";

function App() {
  return (
    <ChatAppProvider>
      <Router>
        <NavBar />

        <Switch>
          <PrivateRoute exact path="/" component={DashBoard} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route component={Default} />
        </Switch>
      </Router>
    </ChatAppProvider>
  );
}

export default App;
