import { useContext } from "react";
import { AuthContext } from "./auth-provider";

export default function useAuth() {
  const auth = useContext(AuthContext);

  if (auth === null) {
    throw "Auth context is null";
  }

  return auth;
}
