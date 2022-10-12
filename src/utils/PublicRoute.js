import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const { user } = useContext(AuthContext);
  return <> {user.auth === false ? children : <Navigate to="/" />} </>;
}

export default PublicRoute;
