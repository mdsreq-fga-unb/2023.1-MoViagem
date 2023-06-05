import { useContext } from "react";
import { AuthContext } from "./auth-provider";

export default function useAuth() {
  return useContext(AuthContext);
}
