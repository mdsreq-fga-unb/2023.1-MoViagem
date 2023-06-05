import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../auth/context/auth-hook";
import styles from "./styles.module.scss";

export default function Login() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  function handleLogin() {
    login();
    navigate("/", { replace: true });
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div id={styles.container}>
      <button id={styles.confirm_button} onClick={handleLogin}>
        login
      </button>
    </div>
  );
}
