import Navbar from "../../components/Navbar";
import TransportForms from "../../components/TransportForms";
import styles from "./styles.module.scss";

export default function EditTransport() {
  const whichAction = true;

  return (
    <Navbar pageName="Editar Transporte">
      <div className={styles.pageContainer}>
        <TransportForms whichAction={whichAction} />
      </div>
    </Navbar>
  );
}
