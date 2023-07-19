import React, { useState } from "react";
import { ErrorResponse } from "../../../api/api-instance";
import { EventGuestResponseDTO, EventResponseDTO } from "../../../api/dto/travels-dto";
import { requestDeleteEvent, requestEditEvent } from "../../../api/requests/travels-requests";
import styles from "./styles.module.scss";
interface EventInfoModalProps {
  selectedDate: Date;
  closeModal: () => void;
  selectedEvent: EventResponseDTO;
  eventGuests: EventGuestResponseDTO[];
}

const EventInfoModal: React.FC<EventInfoModalProps> = ({
  selectedEvent: event,
  selectedDate,
  closeModal,
  eventGuests,
}) => {
  const [transportType, setTransportType] = useState(event.transportType);
  const [departureLocation, setDepartureLocation] = useState(event.departureLocation);
  const [eventTime, setEventTime] = useState(new Date(event.eventTime).toLocaleTimeString());
  const [eventValue, setEventValue] = useState(event.eventValue);
  const [eventExtras, setEventExtras] = useState(event.eventExtras);
  const [errorMessage, setErrorMessage] = useState("");
  const [tryingDeleteEvent, setTryingDeleteEvent] = useState(false);

  const handleSaveEvent = async () => {
    // Validate and save the event data
    // Perform validation checks and show error message if necessary
    if (eventExtras.length > 250) {
      setErrorMessage("Extras should be limited to 250 characters");
      return;
    }

    const mergeTimeDate = selectedDate;
    const [hours, minutes] = eventTime.split(":");

    mergeTimeDate.setHours(parseInt(hours), parseInt(minutes));

    // Process the event data and save it
    // Save the event data or perform any other required actions
    const response = await requestEditEvent(
      {
        transportType,
        departureLocation,
        eventTime: mergeTimeDate,
        eventValue,
        eventExtras,
      },
      event.id
    );

    if (response instanceof ErrorResponse) {
      alert(response.message);
      return;
    }

    //Success

    alert("Evento alterado com sucesso.");

    // Close the modal
    closeModal();
  };

  function handleDeleteEvent() {
    setTryingDeleteEvent(!tryingDeleteEvent);
  }

  const sendDeleteEvent = async () => {
    const response = await requestDeleteEvent(event.id.toString());

    if (response instanceof ErrorResponse) {
      alert(response.status === 400 ? "Erro em deletar evento" : "");
      return;
    }

    location.reload();
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.outsideModal} onClick={closeModal}></div>

      <div className={styles.disponibilityBox}>
        <div className={styles.formField}>
          <label>Número de participantes:</label>
          <div className={styles.disponibilityNumber}>{eventGuests.length}</div>
        </div>
        <div className={styles.formField}>
          <label>Participantes:</label>
          <div className={styles.disponibilityNames}>
            {eventGuests.map((guest) => guest.name).join(", ")}
          </div>
        </div>
      </div>

      <div className={styles.modal}>
        <form className={styles.modalContent} onSubmit={handleSaveEvent}>
          <h2 className={styles.modalTitle}>Dados do Evento</h2>
          <div className={styles.formField}>
            <label>Transporte ao local:</label>
            <input
              type="text"
              className={styles.inputBox}
              value={transportType}
              onChange={(e) => setTransportType(e.target.value)}
            />
          </div>
          <div className={styles.formField}>
            <label>Local do evento:</label>
            <input
              type="text"
              required
              className={styles.inputBox}
              value={departureLocation}
              onChange={(e) => setDepartureLocation(e.target.value)}
            />
          </div>
          <div className={styles.formField}>
            <label>Horário:</label>
            <input
              type="time"
              className={styles.inputBox}
              value={eventTime}
              required
              onChange={(e) => setEventTime(e.target.value)}
            />
          </div>
          <div className={styles.formField}>
            <label>Preço (se tiver):</label>
            <input
              type="number"
              className={styles.inputBox}
              value={eventValue}
              onChange={(e) => setEventValue(parseInt(e.target.value))}
            />
          </div>
          <div className={styles.formField}>
            <label>Observações:</label>
            <textarea
              className={styles.textAreaBox}
              rows={2}
              value={eventExtras}
              onChange={(e) => setEventExtras(e.target.value)}
            />
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.submitButton} type="submit">
              Salvar Dados
            </button>
            <button className={styles.deleteButton} onClick={handleDeleteEvent} type="reset">
              Excluir Evento
            </button>
          </div>
        </form>
      </div>
      {tryingDeleteEvent ? (
        <div className={styles.confirmBox}>
          <button className={styles.exitDeleteButton} onClick={handleDeleteEvent}>
            X
          </button>
          <div className={styles.infoBox}>Você tem certeza que deseja excluir este evento?</div>
          <button className={styles.confirmDeleteButton} onClick={sendDeleteEvent}>
            Excluir
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EventInfoModal;
