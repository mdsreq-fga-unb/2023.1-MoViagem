import React, { useState } from "react";
import { ErrorResponse } from "../../api/api-instance";
import { deleteAccount, editEmail, editName, editPassword } from "../../api/requests/auth-requests";
import useAuth from "../../auth/context/auth-hook";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";

export default function EditUserInfo() {
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
  const handleNameEdit = () => {
    setIsEditingName(!isEditingName);
    setIsEditingEmail(false);
    setIsEditingPassword(false);

    setNewName("");
    setNewEmail("");
    setNewPassword("");
    setNewPasswordConfirmation("");
    setCurrentPasswordConfirmation("");
  };

  const sendNewName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (auth.userInfo == null) {
      throw "userInfo context is null";
    }
    const response = await editName({ name: newName }, auth.userInfo.id.toString());

    if (response instanceof ErrorResponse) {
      alert(response.status === 400 ? "não foi possivel editar o nome" : "");
      return;
    }
    auth.updateUserInfo({ name: newName });
    setNewName("");
    setIsEditingName(false);
    return response;
  };

  const sendNewEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (auth.userInfo == null) {
      throw "userInfo context is null";
    }
    const response = await editEmail({ email: newEmail }, auth.userInfo.id.toString());

    if (response instanceof ErrorResponse) {
      alert(response.status === 400 ? "não foi possivel editar o email" : "");
      return;
    }
    auth.updateUserInfo({ email: newEmail });
    setNewEmail("");
    setIsEditingEmail(false);
    return response;
  };
  const sendDeleteAccount = async () => {
    if (auth.userInfo == null) {
      throw "userInfo context is null";
    }
    const response = await deleteAccount(auth.userInfo?.id.toString());
    if (response instanceof ErrorResponse) {
      alert(response.status === 400 ? "não foi possivel editar o email" : "");
      return;
    }
    auth.eraseTokens();
    window.location.href = "/login-and-register";
  };

  const sendNewPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let response: any;

    if (auth.userInfo == null) {
      throw "userInfo context is null";
    }
    if (newPassword === newPasswordConfirmation) {
      response = await editPassword(
        { newPassword: newPasswordConfirmation, currentPassword: currentPasswordConfirmation },
        auth.userInfo.id.toString()
      );
    }
    if (response instanceof ErrorResponse) {
      alert(response.status === 400 ? "não foi possivel editar a senha" : "");
      return;
    }
    setIsEditingPassword(false);
    return response;
  };
  // Opens the input field for a new email
  const handleEmailEdit = () => {
    setIsEditingName(false);
    setIsEditingEmail(!isEditingEmail);
    setIsEditingPassword(false);

    setNewName("");
    setNewEmail("");
    setNewPassword("");
    setNewPasswordConfirmation("");
    setCurrentPasswordConfirmation("");
  };

  // Opens the input field for a new password
  const handlePasswordEdit = () => {
    setIsEditingName(false);
    setIsEditingEmail(false);
    setIsEditingPassword(!isEditingPassword);

    setNewName("");
    setNewEmail("");
    setNewPassword("");
    setNewPasswordConfirmation("");
    setCurrentPasswordConfirmation("");
  };

  // Closes the input field for all user information
  const handleExitEdition = () => {
    setIsEditingName(false);
    setIsEditingEmail(false);
    setIsEditingPassword(false);
  };

  // Verify if the user really wants to delete their account
  const handleDeleteAccount = () => {
    setTryingDeleteAccount(!tryingDeleteAccount);
  };

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

                // <div className={styles.formsBox}>
                //   <div className={styles.infoBox}>** Nome da pessoa **</div>
                //   <button className={styles.editButton} onClick={handleNameEdit}>
                //     Edit
                //   </button>
                // </div>
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

                // <div className={styles.formsBox}>
                //   <div className={styles.infoBox}>** Email da pessoa **</div>
                //   <button className={styles.editButton} onClick={handleEmailEdit}>
                //     Edit
                //   </button>
                // </div>
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
