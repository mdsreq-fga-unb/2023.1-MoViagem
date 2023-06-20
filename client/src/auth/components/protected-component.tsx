import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/auth-hook";

export default function ProtectedComponent() {
  const auth = useAuth();

  if (auth.userInfo === null) {
    return <Navigate to="/login-and-register" />;
  }

  return <Outlet />;
}
