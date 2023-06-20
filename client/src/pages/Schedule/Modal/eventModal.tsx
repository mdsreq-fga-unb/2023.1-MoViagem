import React, { useState } from "react";
import { ErrorResponse } from "../../../api/api-instance";
import { requestCreateEvent } from "../../../api/requests/travels-requests";
import styles from "./styles.module.scss";

interface EventModalProps {
  selectedDate: Date;
  closeModal: () => void;
  travelId: string;
}

const EventModal: React.FC<EventModalProps> = ({ travelId: id, selectedDate, closeModal }) => {
  const [transportType, setTransportType] = useState("");
  const [departureLocation, setDepartureLocation] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventValue, setEventValue] = useState(0);
  const [eventExtras, setEventExtras] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    const response = await requestCreateEvent(parseInt(id), {
      transportType,
      departureLocation,
      eventTime: mergeTimeDate,
      eventValue,
      eventExtras,
    });

    if (response instanceof ErrorResponse) {
      alert(response.message);
      return;
    }

    //Success

    alert("Evento criado com sucesso.");

    // Close the modal
    closeModal();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Add Event</h2>
        <div className={styles.formField}>
          <label>Tipo de transporte:</label>
          <input
            type="text"
            value={transportType}
            onChange={(e) => setTransportType(e.target.value)}
          />
        </div>
        <div className={styles.formField}>
          <label>Local de partida e chegada:</label>
          <input
            type="text"
            value={departureLocation}
            onChange={(e) => setDepartureLocation(e.target.value)}
          />
        </div>
        <div className={styles.formField}>
          <label>Horário:</label>
          <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
        </div>
        <div className={styles.formField}>
          <label>Valor:</label>
          <input
            type="number"
            value={eventValue}
            onChange={(e) => setEventValue(parseInt(e.target.value))}
          />
        </div>
        <div className={styles.formField}>
          <label>Extras:</label>
          <textarea value={eventExtras} onChange={(e) => setEventExtras(e.target.value)} />
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={handleSaveEvent}>Save</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
