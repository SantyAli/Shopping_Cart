import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "", auth: false });
  

  const setAuthStatus =  (name, auth) => {
    setUser({
      name,
      auth,
    });
  };

  return (
    <AuthContext.Provider value={{ user, setAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
