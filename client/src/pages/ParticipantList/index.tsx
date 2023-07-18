import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorResponse } from "../../api/api-instance";
import { GuestResponseDTO } from "../../api/dto/travels-dto";
import {
  requestAddGuestToTravel,
  requestGetGuests,
  requestRemoveGuestFromTravel,
} from "../../api/requests/travels-requests";
import PersonIcon from "../../assets/PessoaIndoViajar.png";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";

export default function ParticipantList() {
  const travelId = useParams().id!;

  // Participant variables
  const [participants, setParticipants] = useState<GuestResponseDTO[]>([]);

  // Modal variables
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  // Participant fetch request
  const fetchGuests = useCallback(async () => {
    const response = await requestGetGuests(travelId);

    if (response instanceof ErrorResponse) {
      alert(response.message);
      return;
    }

    setParticipants(response.data);
  }, [travelId]);

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  // Modal functions
  async function toggleModal() {
    setEmail("");
    setOpen(!open);
  }

  async function handleAddGuestSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await requestAddGuestToTravel(email, travelId);

    if (response instanceof ErrorResponse) {
      alert(response.message);
      return;
    }

    alert("Adicionado com sucesso!");

    fetchGuests();
    toggleModal();
  }

  async function handleRemoveGuest(participantId: number) {
    if (confirm("Tem certeza que deseja remover este participante?")) {
      try {
        await requestRemoveGuestFromTravel(participantId, parseInt(travelId));
        alert("Removido com sucesso! ");
        fetchGuests();
      } catch (error) {
        alert(error);
      }
    }
  }

  return (
    <>
      <Navbar pageName="Lista de participantes da viagem">
        <div className={styles.pageContainer}>
          <header>
            <button id={styles.createTravelButton} onClick={toggleModal}>
              <PersonAddAlt1Icon fontSize="large" />
              <div id={styles.buttonText}>Adicionar Participante</div>
            </button>
          </header>
          <div className={styles.bodyContainer}>
            <section className={styles.outsideBox}>
              {participants.map((participant) => (
                <div className={styles.insideBox} key={participant.id}>
                  <div className={styles.infoBox}>
                    <h3>{participant.name}</h3>
                    <img className={styles.personImage} alt="Fundo Pessoa" src={PersonIcon}></img>
                    <div className={styles.infoText}>
                      <p>{/* participant.canEdit */}</p>
                    </div>
                    <div className={styles.infoText}>Info</div>
                    <div className={styles.sideBarLinkContainer}>
                      <button onClick={() => handleRemoveGuest(participant.id)}>Deletar</button>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </Navbar>
      <Dialog open={open} onClose={toggleModal} fullWidth>
        <DialogTitle>Adicionar Participante</DialogTitle>
        <form onSubmit={handleAddGuestSubmit} onReset={toggleModal}>
          <DialogContent>
            <DialogContentText>
              Para adicionar um participante, digite o email do mesmo no campo abaixo e clique em
              adicionar. Se o email for válido, o participante será adicionado à viagem.
            </DialogContentText>
            <div className={styles.inputContainer}>
              <label htmlFor="email-modal">Email do participante</label>
              <input
                type="email"
                id="email-modal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <button type="reset">Cancelar</button>
            <button type="submit">Adicionar</button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
