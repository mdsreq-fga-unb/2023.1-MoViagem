import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";
import PersonIcon from "../../assets/PessoaIndoViajar.png"
import { ErrorResponse } from "../../api/api-instance";

export default function ParticipantList() {
  // Participant variables
  const [participants, setParticipants] = useState<string[]>([])

  // Participant fetch request
  // const fetchTravel = async () => {
  //   const response = await requestGetParticipants();

  //   if (response instanceof ErrorResponse) {
  //     alert(response.message);
  //     return;
  //   }

  //   setParticipants(response.data);
  // };

  useEffect(() => {
    // fetchTravel();
    setParticipants(["teste 1", "teste 2"])
  }, []);

  return (
    <Navbar pageName="Lista de participantes da viagem" selectedPage="GROUPS">
      <div className={styles.pageContainer}>
        <header>
          <button id={styles.createTravelButton}>
            <PersonAddAlt1Icon fontSize="large" />
            <div id={styles.buttonText}>Adicionar Participante</div>
          </button>
        </header>
        <div className={styles.bodyContainer}>
          <section className={styles.outsideBox}>
            {participants.map((participant) => (
              <button className={styles.insideBox}>
                <div className={styles.infoBox}>
                  <h3>{/* participant.userName */}</h3>
                  <img className={styles.personImage} alt="Fundo Pessoa" src={PersonIcon}></img>
                  <div className={styles.infoText}>
                    <p>
                      {/* participant.canEdit */}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </section>
        </div>
      </div>
    </Navbar>
  );
}
