import { AxiosError } from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { requestLogin } from "../../api/requests/auth-requests";
import useAuth from "../../auth/context/auth-hook";
import styles from "./styles.module.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { saveTokens, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await requestLogin({ email, password });

      saveTokens(response.data);
      navigate("/", { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.status === 401 ? "Credenciais inválidas" : "Erro ao fazer login");
      }
    }
  }

  return (
    <div id={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="e-mail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="senha"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
