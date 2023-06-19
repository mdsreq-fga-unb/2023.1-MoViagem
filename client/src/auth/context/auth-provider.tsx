import React, { useCallback, useEffect, useMemo, useState } from "react";
import { UserInfo } from "../../api/dto/auth-dtos";

interface LoginParams {
  accessToken: string;
  refreshToken: string;
  userInfo: UserInfo;
}

interface AuthContextInterface {
  userInfo: UserInfo | null;
  saveTokens: (data: LoginParams) => void;
  eraseTokens: () => void;
  updateUserInfo: (data: Partial<UserInfo>) => void;
}

export const AuthContext = React.createContext<AuthContextInterface | undefined>(undefined);

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userInfo = localStorage.getItem("userInfo");

    if (accessToken !== null && refreshToken !== null && userInfo !== null) {
      setUserInfo(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const saveTokens = useCallback(({ accessToken, refreshToken, userInfo }: LoginParams) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    setUserInfo(userInfo);
  }, []);

  const eraseTokens = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");

    setUserInfo(null);
  }, []);

  const updateUserInfo = useCallback(
    (newUserInfo: Partial<UserInfo>) => {
      if (userInfo === null) {
        throw "erro inesperado";
      }

      userInfo.name = newUserInfo.name ?? userInfo.name;

      userInfo.email = newUserInfo.email ?? userInfo.email;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      setUserInfo(userInfo);
    },
    [userInfo]
  );

  const value = useMemo(
    () => ({ userInfo, saveTokens, eraseTokens, updateUserInfo }),
    [eraseTokens, saveTokens, userInfo, updateUserInfo]
  );
  if (loading) {
    return null;
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
