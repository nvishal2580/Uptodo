import React, { useEffect, useState } from "react";
import app from "./firebase";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  if(pending){
    return <>
      <div className="h-screen grow flex justify-center items-center" ><div class="animate-spin rounded-full w-20 h-20 border-4 border-b-blue-400 border-solid"></div></div>
    </>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;