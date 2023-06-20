import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import TransportForms from "../../components/TransportForms";
import styles from "./styles.module.scss";

export default function EditTransport() {
  const params = useParams();

  return (
    <Navbar pageName="Editar Transporte">
      <div className={styles.pageContainer}>
        <TransportForms isEditing={true} id={params.id} />
      </div>
    </Navbar>
  );
}
