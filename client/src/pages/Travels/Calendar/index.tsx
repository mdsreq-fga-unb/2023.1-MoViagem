import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import EventModal from "./Modal/eventModal.tsx";
import styles from "./styles.module.scss";

const Calendar: React.FC = () => {
  const date = useMemo(() => new Date(), []);
  const [currentDate, setCurrentDate] = useState("");
  const [currentDateForSidebar, setCurrentDateForSidebar] = useState("");
  const [daysTag, setDaysTag] = useState("");
  const [currMonth, setCurrMonth] = useState<number>(date.getMonth());
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const currYearRef = useRef<number>(date.getFullYear());

  const handleDayClick = (day: number) => {
    const selectedDateEvent = new Date(currYearRef.current, currMonth, day);
    setSelectedDate(selectedDateEvent);
    setShowModal(true);
    console.log("Day clicked:", selectedDate);
  };

  const renderCalendar = useCallback(() => {
    const firstDayOfMonth = new Date(date.getFullYear(), currMonth, 1).getDay();
    const lastDateOfMonth = new Date(date.getFullYear(), currMonth + 1, 0).getDate();
    const lastDayOfMonth = new Date(date.getFullYear(), currMonth, lastDateOfMonth).getDay();
    const lastDateOfLastMonth = new Date(date.getFullYear(), currMonth, 0).getDate();

    const months = [
      "Janeiro",
      "Fevereiro",
      "Marco",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const days: JSX.Element[] = [];

    for (let i = firstDayOfMonth; i > 0; i--) {
      days.push(
        <li key={`prev-${i}`} className={styles.inactive}>
          {lastDateOfLastMonth - i + 1}
        </li>
      );
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday =
        i === date.getDate() &&
        currMonth === date.getMonth() &&
        date.getFullYear() === date.getFullYear()
          ? styles.active
          : "";
      days.push(
        <li
          key={`curr-${i}`}
          className={styles.days + " " + isToday}
          onClick={() => {
            handleDayClick(i);
          }}
        >
          {i}
        </li>
      );
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
      days.push(
        <li key={`next-${i}`} className={styles.inactive}>
          {i - lastDayOfMonth + 1}
        </li>
      );
    }

    const currentMonth = months[currMonth];
    const currentDay = date.getDate();

    const selectedDateEvent = new Date(currYearRef.current, currMonth);
    const currentDayForSidebar = selectedDateEvent;

    setSelectedDate(selectedDateEvent);
    setCurrentDateForSidebar(`${currentDayForSidebar} ${months[currMonth]} ${currYearRef.current}`);

    console.log("Day clicked:", selectedDate);

    setCurrentDate(`${currentDay} ${months[currMonth]} ${currYearRef.current}`);
    setDaysTag(ReactDOMServer.renderToString(<ul>{days}</ul>));
  }, [currMonth, date]);

  useEffect(() => {
    renderCalendar();
  }, [renderCalendar]);

  const handleIconClick = useCallback(
    (increment: number) => {
      setCurrMonth((prevMonth) => {
        let updatedMonth = prevMonth + increment;
        let updatedYear = date.getFullYear();

        if (updatedMonth < 0) {
          updatedMonth = 11;
          updatedYear--;
        } else if (updatedMonth > 11) {
          updatedMonth = 0;
          updatedYear++;
        }

        currYearRef.current = updatedYear; // Update year reference

        return updatedMonth;
      });
    },
    [date]
  );

  const handleModalOpen = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.boxContainer}>
          {showModal && (
            <EventModal selectedDate={selectedDate} closeModal={() => setShowModal(false)} />
          )}
          <div className={styles.sidebar}>
            {/* Sidebar Content */}
            <h2>{currentDateForSidebar}</h2>
            {/* Fetch and display activities for the selected date */}
            <ul>
              <li>Activity 1</li>
              <li>Activity 2</li>
              <li>Activity 3</li>
            </ul>
            <button onClick={handleModalOpen}>Open Modal</button>
          </div>
          <div className={styles.calendar}>
            <header>
              <p className={styles.currentDate}>{currentDate}</p>
            </header>
            <ul className={styles.weeks}>
              <li>Domingo</li>
              <li>Segunda</li>
              <li>Terça</li>
              <li>Quarta</li>
              <li>Quinta</li>
              <li>Sexta</li>
              <li>Sábado</li>
            </ul>
            <div className={styles.days} dangerouslySetInnerHTML={{ __html: daysTag }} />
          </div>
        </div>
      </div>
      <div className={styles.icons}>
        <span className={styles.prev} onClick={() => handleIconClick(-1)}>
          Previous
        </span>
        <span className={styles.next} onClick={() => handleIconClick(1)}>
          Next
        </span>
      </div>
    </>
  );
};

export default Calendar;
