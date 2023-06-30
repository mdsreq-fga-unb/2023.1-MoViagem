import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ErrorResponse } from "../../api/api-instance";
import { requestLogin, requestRegister } from "../../api/requests/auth-requests";
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
    return <Navigate to="/" />;
  }

  async function handleSubmitLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Try to login
    const response = await requestLogin({ email, password });

    if (response instanceof ErrorResponse) {
      alert(response.status === 401 ? "E-mail ou senha incorretos" : "Erro ao fazer login");
      return;
    }

    saveTokens({
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      userInfo: response.data.user,
    });

    // After login, redirect to home page
    navigate("/");
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
    const response = await requestRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });

    if (response instanceof ErrorResponse) {
      alert(response.message);
      return;
    }

    saveTokens({
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      userInfo: response.data.user,
    });

    // After register, redirect to home page
    navigate("/");
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
