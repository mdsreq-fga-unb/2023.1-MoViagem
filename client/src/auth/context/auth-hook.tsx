import { useContext } from "react";
import { AuthContext } from "./auth-provider";

export default function useAuth() {
  const auth = useContext(AuthContext);

  if (auth === undefined) {
    throw "Auth context is null";
  }

  return auth;
}
