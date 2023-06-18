import Navbar from "../../components/Navbar";
import StayForms from "../../components/StayForms";
import styles from "./styles.module.scss";

export default function CreateStay() {

  const whichAction = false;

  return (
    <Navbar pageName="Criar Estadia">
      <div className={styles.pageContainer}>
        <StayForms whichAction={whichAction} />
      </div>
    </Navbar>
  );
}
