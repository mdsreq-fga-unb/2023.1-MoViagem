import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import StayForms from "../../components/StayForms";
import styles from "./styles.module.scss";

export default function EditStay() {
  const params = useParams();
  return (
    <Navbar pageName="Editar Estadia">
      <div className={styles.pageContainer}>
        <StayForms isEditing={true} id={params.id} />
      </div>
    </Navbar>
  );
}
