"use client";

import { userSession } from "@/interfaces/types";
import { useState, useEffect, createContext, useContext } from "react";
import { AuthContextProps } from "@/interfaces/types";
import { AuthProviderProps } from "@/interfaces/types";

export const AuthContext = createContext<AuthContextProps>({
  userData: null,
  setUserData: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<userSession | null>(null);

  useEffect(() => {
    if (userData) {
      localStorage.setItem("userSession", JSON.stringify({ token: userData.token, userData: userData.userData }));
    }
  }, [userData]);

  useEffect(() => {
    const userData = localStorage.getItem("userSession");
    setUserData(JSON.parse(userData!));
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
