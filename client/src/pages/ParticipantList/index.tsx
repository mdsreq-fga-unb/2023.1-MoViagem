import CalendarIcon from "@mui/icons-material/CalendarToday";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import useAuth from "../../auth/context/auth-hook";

export default function ParticipantList() {
  const travelId = useParams().id!;
  const auth = useAuth();

  // Participant variables
  const [participants, setParticipants] = useState<GuestResponseDTO[]>([]);

  // Modal variables
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  // Delete modal variables
  const [currentId, setCurrentId] = useState(0);
  const [deleting, setDeleting] = useState(false);

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

  // Delete modal functions
  async function toggleDelete() {
    setDeleting(!deleting);
  }

  async function handleAddGuestSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (email === auth.userInfo?.email) {
      alert("Você não pode adicionar a si mesmo");
      return;
    }

    const response = await requestAddGuestToTravel(email, travelId);

    if (response instanceof ErrorResponse) {
      alert(response.message);
      return;
    }

    alert("Adicionado com sucesso!");

    fetchGuests();
    toggleModal();
  }

  async function handleRemoveGuest() {
    try {
      await requestRemoveGuestFromTravel(currentId, parseInt(travelId));
      alert("Removido com sucesso! ");
      fetchGuests();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <Navbar pageName="Lista de participantes da viagem">
        <div className={styles.pageContainer}>
          <header>
            <button id={styles.addParticipantButton} onClick={toggleModal}>
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
                    <div className={styles.infoText}>Não pode editar a viagem</div>
                    <div className={styles.sideBarLinkContainer}>
                      <button
                        className={styles.deleteButton}
                        onClick={() => {
                          setCurrentId(participant.id);
                          toggleDelete();
                        }}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
        <Link to={`/travel-info/${travelId}`} id={styles.schedule_link}>
          <IconButton id={styles.schedule_link}>
            <CardTravelIcon fontSize="large" />
          </IconButton>
        </Link>
        <Link to={`/schedule/${travelId}`} id={styles.participants_link}>
          <IconButton id={styles.participants_link}>
            <CalendarIcon fontSize="large" />
          </IconButton>
        </Link>
      </Navbar>
      <Dialog open={open} onClose={toggleModal} fullWidth>
        <DialogTitle className={styles.dialogTitle}>
          <h3>Adicionar Participante</h3>
        </DialogTitle>
        <form onSubmit={handleAddGuestSubmit} onReset={toggleModal}>
          <DialogContent className={styles.dialogContent}>
            <DialogContentText className={styles.dialogContentText}>
              Para adicionar um participante, digite o email do mesmo no campo abaixo e clique em
              adicionar. Se o email for válido, o participante será adicionado à viagem.
            </DialogContentText>
            <div className={styles.inputContainer}>
              <input
                type="email"
                id="email-modal"
                required
                className={styles.inputBox}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </DialogContent>
          <DialogActions className={styles.dialogActions}>
            <button type="reset" className={styles.cancelButton}>
              Cancelar
            </button>
            <button type="submit" className={styles.confirmButton}>
              Adicionar
            </button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={deleting} onClose={toggleDelete} fullWidth>
        <DialogTitle className={styles.dialogTitle}>
          <h3>Excluir Participante</h3>
        </DialogTitle>
        <form onSubmit={handleRemoveGuest} onReset={toggleDelete}>
          <DialogContent className={styles.dialogContent}>
            <DialogContentText className={styles.dialogContentText}>
              Tem certeza que deseja excluir este participante da viagem?
            </DialogContentText>
          </DialogContent>
          <DialogActions className={styles.dialogActions}>
            <button type="reset" className={styles.cancelButton}>
              Cancelar
            </button>
            <button type="submit" className={styles.confirmButton}>
              Excluir
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
