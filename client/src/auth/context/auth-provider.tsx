import React, { useEffect, useMemo, useState } from "react";

interface LoginParams {
  accessToken: string;
  refreshToken: string;
}

interface AuthContextInterface {
  isLoggedIn: boolean;
  saveTokens: (data: LoginParams) => void;
  eraseTokens: () => void;
}

export const AuthContext = React.createContext<AuthContextInterface | undefined>(undefined);

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  function saveTokens({ accessToken, refreshToken }: LoginParams) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    setIsLoggedIn(true);
  }

  function eraseTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setIsLoggedIn(false);
  }

  const value = useMemo(() => ({ isLoggedIn, saveTokens, eraseTokens }), [isLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
