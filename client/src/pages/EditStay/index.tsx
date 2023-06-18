import Navbar from "../../components/Navbar";
import StayForms from "../../components/StayForms";
import styles from "./styles.module.scss";

export default function EditStay() {

  const whichAction = true;

  return (
    <Navbar pageName="Editar Estadia">
      <div className={styles.pageContainer}>
        <StayForms whichAction={whichAction} />
      </div>
    </Navbar>
  );
}