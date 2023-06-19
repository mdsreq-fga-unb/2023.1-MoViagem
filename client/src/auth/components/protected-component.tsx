import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/auth-hook";

export default function ProtectedComponent() {
  const auth = useAuth();

  if (auth.userInfo === null) {
    console.log("estou te redirecionando");
    return <Navigate to="/login-and-register" replace />;
  }

  return <Outlet />;
}
