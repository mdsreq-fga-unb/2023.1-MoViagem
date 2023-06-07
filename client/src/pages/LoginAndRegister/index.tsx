import { AxiosError } from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { register, requestLogin } from "../../api/requests/auth-requests";
import useAuth from "../../auth/context/auth-hook";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordConfirmation, setRegisterPasswordConfirmation] = useState("");

  const { saveTokens, userInfo } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to home page
  if (userInfo !== null) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Try to login
    try {
      const response = await requestLogin({ email, password });

      saveTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        userInfo: response.data.user,
      });

      // After login, redirect to home page
      navigate("/", { replace: true });
    } catch (error) {
      // If login fails, show error message
      if (error instanceof AxiosError) {
        alert(error.response?.status === 401 ? "Credenciais inválidas" : "Erro ao fazer login");
      }
      // If error is not an AxiosError (unexpected error) then throw it (to be handled by React)
      else {
        throw error;
      }
    }
  }

  async function handleSubmitRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Check if passwords match
    if (registerPassword !== registerPasswordConfirmation) {
      alert("As senhas não coincidem");
      return;
    }

    // Check if password is at least 8 characters long
    if (registerPassword.length < 8) {
      alert("A senha deve ter pelo menos 8 caracteres");
      return;
    }

    // Try to register
    try {
      await register({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });

      alert("Usuário criado com sucesso");
    } catch (error) {
      // If registration fails, show error message and return (don't try to login)
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
        return;
      }
      // If error is not an AxiosError (unexpected error) then throw it (to be handled by React)
      else {
        throw error;
      }
    }

    // Try to login with the new user
    try {
      const loginResponse = await requestLogin({
        email: registerEmail,
        password: registerPassword,
      });

      saveTokens({
        accessToken: loginResponse.data.accessToken,
        refreshToken: loginResponse.data.refreshToken,
        userInfo: loginResponse.data.user,
      });

      // After login, redirect to home page
      navigate("/", { replace: true });
    } catch (error) {
      // If login fails, show error message
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
        alert("Erro ao fazer login, tente entrar com o usuário criado anteriormente.");
      }
      // If error is not an AxiosError (unexpected error) then throw it (to be handled by React)
      else {
        throw error;
      }
    }
  }

  return (
    <Navbar pageName="Login">
      <div className={styles.pageContainer}>
        <div className={styles.boxContainer}>
          <div className={styles.outsideBox}>
            <form className={styles.insideBox} onSubmit={handleSubmitLogin}>
              <h2>Já possui cadastro?</h2>
              <input
                type="email"
                placeholder="E-mail"
                className={styles.inputBox}
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                className={styles.inputBox}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button type="submit" className={styles.submitButton}>
                Entrar
              </button>
            </form>

            <div className={styles.verticalLine}></div>

            <form className={styles.insideBox} onSubmit={handleSubmitRegister}>
              <h2>Criar nova conta</h2>
              <input
                type="text"
                placeholder="Nome"
                className={styles.inputBox}
                required
                value={registerName}
                onChange={(event) => setRegisterName(event.target.value)}
              />
              <input
                type="email"
                placeholder="E-mail"
                className={styles.inputBox}
                required
                value={registerEmail}
                onChange={(event) => setRegisterEmail(event.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                className={styles.inputBox}
                required
                value={registerPassword}
                onChange={(event) => setRegisterPassword(event.target.value)}
              />
              <input
                type="password"
                placeholder="Confirmar senha"
                className={styles.inputBox}
                required
                value={registerPasswordConfirmation}
                onChange={(event) => setRegisterPasswordConfirmation(event.target.value)}
              />
              <button className={styles.submitButton}>Criar conta</button>
            </form>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
