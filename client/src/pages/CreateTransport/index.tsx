import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import TransportForms from "../../components/TransportForms";
import styles from "./styles.module.scss";

export default function CreateTransport() {
  const whichAction = false;
  const params = useParams();

  return (
    <Navbar pageName="Criar Transporte">
      <div className={styles.pageContainer}>
        <TransportForms whichAction={whichAction} id={params.id} />
      </div>
    </Navbar>
  );
}
