import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/auth-hook";

export default function ProtectedComponent() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
