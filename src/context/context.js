import React, { createContext, useEffect, useState } from "react";
import app from "../firesbase/firebase";

export const ChatAppContext = createContext();

export const ChatAppProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.email);

        localStorage.setItem("login", user.email);
      }
    });
  }, [currentUser]);

  return (
    <ChatAppContext.Provider value={{ currentUser }}>
      {props.children}
    </ChatAppContext.Provider>
  );
};
