import React, { useState } from "react";
import styles from "./styles.module.scss";

interface EventModalProps {
  selectedDate: Date | null;
  closeModal: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ selectedDate, closeModal }) => {
  const [transportType, setTransportType] = useState("");
  const [departureLocation, setDepartureLocation] = useState("");
  const [arrivalLocation, setArrivalLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventValue, setEventValue] = useState("");
  const [eventExtras, setEventExtras] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSaveEvent = () => {
    // Validate and save the event data
    // Perform validation checks and show error message if necessary
    if (eventExtras.length > 250) {
      setErrorMessage("Extras should be limited to 250 characters");
      return;
    }

    // Process the event data and save it
    const eventData = {
      transportType,
      departureLocation,
      arrivalLocation,
      eventDate,
      eventTime,
      eventValue,
      eventExtras,
    };

    // Save the event data or perform any other required actions
    console.log("Event data:", eventData);

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
          <label>Data:</label>
          <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        </div>
        <div className={styles.formField}>
          <label>Horário:</label>
          <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
        </div>
        <div className={styles.formField}>
          <label>Valor:</label>
          <input type="text" value={eventValue} onChange={(e) => setEventValue(e.target.value)} />
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
