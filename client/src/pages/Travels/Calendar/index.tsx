import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import EventModal from "./Modal/eventModal.tsx";
import styles from "./styles.module.scss";

const Calendar: React.FC = () => {
  const date = useMemo(() => new Date(), []);
  const [currentDate, setCurrentDate] = useState("");
  const [daysTag, setDaysTag] = useState("");
  const [currMonth, setCurrMonth] = useState<number>(date.getMonth());
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const currYearRef = useRef<number>(date.getFullYear());

  const renderCalendar = useCallback(() => {
    const firstDayOfMonth = new Date(date.getFullYear(), currMonth, 1).getDay();
    const lastDateOfMonth = new Date(date.getFullYear(), currMonth + 1, 0).getDate();
    const lastDayOfMonth = new Date(date.getFullYear(), currMonth, lastDateOfMonth).getDay();
    const lastDateOfLastMonth = new Date(date.getFullYear(), currMonth, 0).getDate();

    const handleDayClick = (day: number) => {
      const selectedDate = new Date(currYearRef.current, currMonth, day);
      setSelectedDate(selectedDate);
      setShowModal(true);
      console.log("Day clicked:", selectedDate);
    };

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
        <li key={`prev-${i}`} className="inactive">
          {lastDateOfLastMonth - i + 1}
        </li>
      );
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday =
        i === date.getDate() &&
        currMonth === date.getMonth() &&
        date.getFullYear() === date.getFullYear()
          ? "active"
          : "";
      days.push(
        <li key={`curr-${i}`} className={styles[isToday]} onClick={() => handleDayClick(i)}>
          {i}
        </li>
      );
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
      days.push(
        <li key={`next-${i}`} className="inactive">
          {i - lastDayOfMonth + 1}
        </li>
      );
    }

    setCurrentDate(`${months[currMonth]} ${currYearRef.current}`);
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

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.boxContainer}>
          <div className={styles.outsideBox}>
            <header>
              <p className={styles.currentDate}>{currentDate}</p>
            </header>
          </div>
        </div>
      </div>
      <div className={styles.calendar}>
        <ul className={styles.weeks}>
          <li>Domingo</li>
          <li>Segunda</li>
          <li>Terça</li>
          <li>Quarta</li>
          <li>Quinta</li>
          <li>Sexta</li>
          <li>Sábado</li>
          <ul className={styles.days} dangerouslySetInnerHTML={{ __html: daysTag }} />
        </ul>
      </div>
      {showModal && (
        <EventModal selectedDate={selectedDate} closeModal={() => setShowModal(false)} />
      )}
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
