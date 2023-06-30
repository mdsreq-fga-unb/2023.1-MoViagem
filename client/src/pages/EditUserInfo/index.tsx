import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorResponse } from "../../api/api-instance";
import {
  requestDeleteAccount,
  requestEditPassword,
  requestEditUser,
} from "../../api/requests/user-requests";
import useAuth from "../../auth/context/auth-hook";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";

export default function EditUserInfo() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  const [currentPasswordConfirmation, setCurrentPasswordConfirmation] = useState("");

  const [tryingDeleteAccount, setTryingDeleteAccount] = useState(false);

  // Opens the input field for a new name
  function handleNameEdit() {
    setIsEditingName(!isEditingName);
    setIsEditingEmail(false);
    setIsEditingPassword(false);

    setNewName("");
    setNewEmail("");
    setNewPassword("");
    setNewPasswordConfirmation("");
    setCurrentPasswordConfirmation("");
  }

  // Opens the input field for a new email
  function handleEmailEdit() {
    setIsEditingName(false);
    setIsEditingEmail(!isEditingEmail);
    setIsEditingPassword(false);

    setNewName("");
    setNewEmail("");
    setNewPassword("");
    setNewPasswordConfirmation("");
    setCurrentPasswordConfirmation("");
  }

  // Opens the input field for a new password
  function handlePasswordEdit() {
    setIsEditingName(false);
    setIsEditingEmail(false);
    setIsEditingPassword(!isEditingPassword);

    setNewName("");
    setNewEmail("");
    setNewPassword("");
    setNewPasswordConfirmation("");
    setCurrentPasswordConfirmation("");
  }

  // Closes the input field for all user information
  function handleExitEdition() {
    setIsEditingName(false);
    setIsEditingEmail(false);
    setIsEditingPassword(false);
  }

  // Verify if the user really wants to delete their account
  function handleDeleteAccount() {
    setTryingDeleteAccount(!tryingDeleteAccount);
  }

  async function sendNewName(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (auth.userInfo == null) {
      throw "user is not logged in, this should not happen";
    }

    const response = await requestEditUser({ name: newName, email: auth.userInfo.email });

    if (response instanceof ErrorResponse) {
      alert(response.message);
      return;
    }

    auth.updateUserInfo({ name: newName });
    setNewName("");
    setIsEditingName(false);
  }

  async function sendNewEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (auth.userInfo == null) {
      throw "user is not logged in, this should not happen";
    }

    const response = await requestEditUser({ email: newEmail, name: auth.userInfo.name });

    if (response instanceof ErrorResponse) {
      alert(response.message);
      return;
    }

    auth.updateUserInfo({ email: newEmail });
    setNewEmail("");
    setIsEditingEmail(false);
  }

  async function sendDeleteAccount() {
    if (auth.userInfo == null) {
      throw "user is not logged in, this should not happen";
    }

    const response = await requestDeleteAccount();

    if (response instanceof ErrorResponse) {
      alert(response.status === 400 ? "Este usuário possui viagens" : "");
      return;
    }

    auth.eraseTokens();
    navigate("/login-and-register");
  }

  async function sendNewPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (auth.userInfo == null) {
      throw "user is not logged in, this should not happen";
    }

    if (newPassword !== newPasswordConfirmation) {
      alert("As senhas não conferem");
      return;
    }

    const response = await requestEditPassword({
      newPassword,
      currentPassword: currentPasswordConfirmation,
    });

    if (response instanceof ErrorResponse) {
      alert(response.message);
      return;
    }

    setIsEditingPassword(false);
  }

  return (
    <Navbar pageName="Minha Conta">
      <div className={styles.pageContainer}>
        <div className={styles.boxContainer}>
          <div className={styles.outsideBox}>
            <div className={styles.insideBox}>
              <h2>Dados</h2>
              {isEditingName ? (
                <form className={styles.formsBox} onSubmit={sendNewName}>
                  <input
                    type="text"
                    placeholder="Digite o novo nome..."
                    className={styles.inputBox}
                    required
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                  />
                  <button className={styles.confirmEditButton}>Ok</button>
                  <button className={styles.exitEditButton} onClick={handleExitEdition}>
                    X
                  </button>
                </form>
              ) : (
                <form className={styles.formsBox}>
                  <input
                    type="text"
                    placeholder={auth.userInfo?.name}
                    className={styles.inputBox}
                    required
                    disabled
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                  />
                  <button className={styles.editButton} onClick={handleNameEdit}>
                    Edit
                  </button>
                </form>
              )}
              {isEditingEmail ? (
                <form className={styles.formsBox} onSubmit={sendNewEmail}>
                  <input
                    type="text"
                    placeholder="Digite o novo e-mail..."
                    className={styles.inputBox}
                    required
                    value={newEmail}
                    onChange={(event) => setNewEmail(event.target.value)}
                  />
                  <button className={styles.confirmEditButton}>Ok</button>
                  <button className={styles.exitEditButton} onClick={handleExitEdition}>
                    X
                  </button>
                </form>
              ) : (
                <form className={styles.formsBox}>
                  <input
                    type="text"
                    placeholder={auth.userInfo?.email}
                    className={styles.inputBox}
                    required
                    disabled
                    value={newEmail}
                    onChange={(event) => setNewEmail(event.target.value)}
                  />
                  <button className={styles.editButton} onClick={handleEmailEdit}>
                    Edit
                  </button>
                </form>
              )}
              {isEditingPassword ? (
                <form className={styles.passwordFormsBox} onSubmit={sendNewPassword}>
                  <input
                    type="password"
                    placeholder="Digite a senha atual..."
                    className={styles.passwordInputBox}
                    required
                    value={currentPasswordConfirmation}
                    onChange={(event) => setCurrentPasswordConfirmation(event.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Digite a nova senha..."
                    className={styles.passwordInputBox}
                    required
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Confirme a nova senha..."
                    className={styles.passwordInputBox}
                    required
                    value={newPasswordConfirmation}
                    onChange={(event) => setNewPasswordConfirmation(event.target.value)}
                  />
                  <button className={styles.passwordButton}>Ok</button>
                  <button className={styles.exitPasswordEditButton} onClick={handleExitEdition}>
                    X
                  </button>
                </form>
              ) : (
                <div className={styles.formsBox}>
                  <div className={styles.infoBox}>********</div>
                  <button className={styles.editButton} onClick={handlePasswordEdit}>
                    Edit
                  </button>
                </div>
              )}
              <button className={styles.deleteButton} onClick={handleDeleteAccount}>
                EXCLUIR CONTA
              </button>
              {tryingDeleteAccount ? (
                <div className={styles.confirmBox}>
                  <button className={styles.exitDeleteButton} onClick={handleDeleteAccount}>
                    X
                  </button>
                  <div className={styles.infoBox}>
                    Você tem certeza que deseja excluir sua conta?
                  </div>
                  <button className={styles.deleteButton} onClick={sendDeleteAccount}>
                    Excluir
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
