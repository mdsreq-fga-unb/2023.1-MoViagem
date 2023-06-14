import { useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";

export default function EditUserInfo() {

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  const [currentPasswordConfirmation, setCurrentPasswordConfirmation] = useState("");

  const [tryingDeleteAccount, setTryingDeleteAccount] = useState(false)

  // Opens the input field for a new name
  const handleNameEdit = () => {
    setIsEditingName(!isEditingName);
    setIsEditingEmail(false);
    setIsEditingPassword(false);

    setNewName("")
    setNewEmail("")
    setNewPassword("")
    setNewPasswordConfirmation("")
    setCurrentPasswordConfirmation("")
  }

  // Opens the input field for a new email
  const handleEmailEdit = () => {
    setIsEditingName(false);
    setIsEditingEmail(!isEditingEmail);
    setIsEditingPassword(false);

    setNewName("")
    setNewEmail("")
    setNewPassword("")
    setNewPasswordConfirmation("")
    setCurrentPasswordConfirmation("")
  }

  // Opens the input field for a new password
  const handlePasswordEdit = () => {
    setIsEditingName(false);
    setIsEditingEmail(false);
    setIsEditingPassword(!isEditingPassword);

    setNewName("")
    setNewEmail("")
    setNewPassword("")
    setNewPasswordConfirmation("")
    setCurrentPasswordConfirmation("")
  }

  // Closes the input field for all user information
  const handleExitEdition = () => {
    setIsEditingName(false);
    setIsEditingEmail(false);
    setIsEditingPassword(false);
  }

  // Verify if the user really wants to delete their account
  const handleDeleteAccount = () => {
    setTryingDeleteAccount(!tryingDeleteAccount)
  }

  const deleteAccount = () => {
    // Delete the account
    window.location.href = "/login-and-register";
  }

  return (
    <Navbar pageName="Minha Conta">
      <div className={styles.pageContainer}>
        <div className={styles.boxContainer}>
          <div className={styles.outsideBox}>
            <div className={styles.insideBox}>
              <h2>Dados</h2>
              {
                isEditingName
                ?
                <form className={styles.formsBox}>
                  <input
                    type="text"
                    placeholder="Digite o novo nome..."
                    className={styles.inputBox}
                    required
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                  />
                  <button className={styles.confirmEditButton}>Ok</button>
                  <button className={styles.exitEditButton} onClick={handleExitEdition}>X</button>
                </form>
                :
                <div className={styles.formsBox}>
                  <div className={styles.infoBox}>** Nome da pessoa **</div>
                  <button className={styles.editButton} onClick={handleNameEdit}>Edit</button>
                </div>
              }
              {
                isEditingEmail
                ?
                <form className={styles.formsBox}>
                  <input
                    type="text"
                    placeholder="Digite o novo e-mail..."
                    className={styles.inputBox}
                    required
                    value={newEmail}
                    onChange={(event) => setNewEmail(event.target.value)}
                  />
                  <button className={styles.confirmEditButton}>Ok</button>
                  <button className={styles.exitEditButton} onClick={handleExitEdition}>X</button>
                </form>
                :
                <div className={styles.formsBox}>
                  <div className={styles.infoBox}>** Email da pessoa **</div>
                  <button className={styles.editButton} onClick={handleEmailEdit}>Edit</button>
                </div>
              }
              {
                isEditingPassword
                ?
                <form className={styles.passwordFormsBox}>
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
                  <button className={styles.exitPasswordEditButton} onClick={handleExitEdition}>X</button>
                </form>
                :
                <div className={styles.formsBox}>
                  <div className={styles.infoBox}>********</div>
                  <button className={styles.editButton} onClick={handlePasswordEdit}>Edit</button>
                </div>
              }
              <button className={styles.deleteButton} onClick={handleDeleteAccount}>EXCLUIR CONTA</button>
              {
                tryingDeleteAccount
                ?
                <div className={styles.confirmBox}>
                  <button className={styles.exitDeleteButton} onClick={handleDeleteAccount}>X</button>
                  <div className={styles.infoBox}>Você tem certeza que deseja excluir sua conta?</div>
                  <button className={styles.deleteButton} onClick={deleteAccount}>Excluir</button>
                </div>
                :
                <></>
              }
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  )
}