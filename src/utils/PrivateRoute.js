import React, { useContext } from "react";
import { Navigate} from "react-router-dom";
import { AuthContext } from "../context/authContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return <>{user.auth === true ?  children : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
