import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../../services/firebase/Auth";

const PrivateRoute = ({children }) => {
  const {currentUser} = useContext(AuthContext);
  return (
      !! currentUser && currentUser.emailVerified === true ? (
      children
    ):(
      <Navigate to="/" />
    )
  );
};


export default PrivateRoute