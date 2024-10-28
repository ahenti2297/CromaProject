// @ts-nocheck
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const getUserFromLocalStorage = () => {
  const userDetails = localStorage.getItem("userDetails");
  if (userDetails) {
    const parseData = JSON.parse(userDetails);
    return parseData;
  } else {
    return {};
  }
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage());

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hooks
export const useAuth = () => {
  return useContext(AuthContext);
};
