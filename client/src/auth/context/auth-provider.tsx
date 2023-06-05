import React, { useMemo, useState } from "react";

interface AuthContextInterface {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextInterface>({
  isLoggedIn: false,
  login: () => undefined,
  logout: () => undefined,
});

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function login() {
    console.log("login");
    setIsLoggedIn(true);
  }

  function logout() {
    setIsLoggedIn(false);
  }

  const value = useMemo(() => ({ isLoggedIn, login, logout }), [isLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
