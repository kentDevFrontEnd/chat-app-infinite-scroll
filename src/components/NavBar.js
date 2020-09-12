import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Collapse, Container, NavItem } from "reactstrap";
import app from "../firesbase/firebase";

function NavBar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("login") === null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);
  console.log(isLogin);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // chua xy ly duoc doan isLogin

  const handleSignOut = () => {
    app.auth().signOut();
    localStorage.removeItem("login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Container>
          <Link to="/" className="navbar-brand text-capitalize">
            Chat App
          </Link>
          <Button onClick={toggle} className="navbar-toggler">
            <span className="navbar-toggler-icon"></span>
          </Button>
          <Collapse isOpen={isOpen} className="navbar-collapse">
            <ul className="navbar-nav w-100">
              <NavItem className={isLogin ? "d-none" : ""}>
                <NavLink to="/signin" className="nav-link">
                  Sign In
                </NavLink>
              </NavItem>
              <NavItem className={isLogin ? "d-none" : ""}>
                <NavLink to="/signup" className="nav-link">
                  Sign Up
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/">
                  hi
                </NavLink>
              </NavItem>
              <NavItem className="ml-auto">
                <NavLink
                  to="/signin"
                  className="nav-link"
                  onClick={handleSignOut}
                >
                  Sign Out
                </NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Container>
      </nav>
    </>
  );
}

export default NavBar;
