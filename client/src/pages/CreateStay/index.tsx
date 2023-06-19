import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import StayForms from "../../components/StayForms";
import styles from "./styles.module.scss";

export default function CreateStay() {
  const whichAction = false;
  const params = useParams();

  return (
    <Navbar pageName="Criar Estadia">
      <div className={styles.pageContainer}>
        <StayForms whichAction={whichAction} id={params.id} />
      </div>
    </Navbar>
  );
}
