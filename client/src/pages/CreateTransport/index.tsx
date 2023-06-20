import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import TransportForms from "../../components/TransportForms";
import styles from "./styles.module.scss";

export default function CreateTransport() {
  const params = useParams();

  return (
    <Navbar pageName="Criar Transporte">
      <div className={styles.pageContainer}>
        <TransportForms isEditing={false} id={params.id} />
      </div>
    </Navbar>
  );
}
