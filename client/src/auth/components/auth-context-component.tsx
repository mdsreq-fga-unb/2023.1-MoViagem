import { Outlet } from "react-router-dom";
import AuthProvider from "../context/auth-provider";

export default function AuthProviderComponent() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
