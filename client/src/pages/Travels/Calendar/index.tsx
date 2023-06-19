import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import styles from "./styles.module.scss";

const Calendar: React.FC = () => {
  // Use useMemo to create the 'date' object once
  const date = useMemo(() => new Date(), []);
  const [currentDate, setCurrentDate] = useState("");
  const [daysTag, setDaysTag] = useState("");
  const [prevNextIcon, setPrevNextIcon] = useState<NodeListOf<Element> | null>(null);
  const [currMonth, setCurrMonth] = useState<number>(date.getMonth());

  const currYearRef = useRef<number>(date.getFullYear());

  const renderCalendar = useCallback(() => {
    // Get the necessary information for rendering the calendar
    const firstDayOfMonth = new Date(currYearRef.current, currMonth, 1).getDay();
    const lastDateOfMonth = new Date(currYearRef.current, currMonth + 1, 0).getDate();
    const lastDayOfMonth = new Date(currYearRef.current, currMonth, lastDateOfMonth).getDay();
    const lastDateOfLastMonth = new Date(currYearRef.current, currMonth, 0).getDate();

    // Define the array of month names
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

    // Create an array to hold the JSX elements for each day
    const days: JSX.Element[] = [];

    for (let i = firstDayOfMonth; i > 0; i--) {
      // Creating li elements for the previous month's last days
      days.push(
        <li key={`prev-${i}`} className="inactive">
          {lastDateOfLastMonth - i + 1}
        </li>
      );
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      // Creating li elements for all days of the current month
      const isToday =
        i === date.getDate() &&
        currMonth === new Date().getMonth() &&
        currYearRef.current === new Date().getFullYear()
          ? "active"
          : "";
      days.push(
        <li key={`curr-${i}`} className={styles[isToday]}>
          {i}
        </li>
        // Use styles[isToday] to apply the correct CSS class
      );
      // Adding active class to li if current day, month, and year match
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
      // Creating li elements for the next month's first days
      days.push(
        <li key={`next-${i}`} className="inactive">
          {i - lastDayOfMonth + 1}
        </li>
      );
    }

    setCurrentDate(`${months[currMonth]} ${currYearRef.current}`);
    // Use ReactDOMServer to convert the array of elements into a string
    setDaysTag(ReactDOMServer.renderToString(<ul>{days}</ul>));
  }, [currMonth, date]);

  useEffect(() => {
    const currentDateElement = document.querySelector(".current-date");
    const daysElement = document.querySelector(".styles.days");
    const prevNextIcons = document.querySelectorAll(".icons span");

    setCurrentDate(currentDateElement?.textContent ?? "");
    setDaysTag(daysElement?.innerHTML ?? "");
    setPrevNextIcon(prevNextIcons);

    renderCalendar();
  }, [renderCalendar]);

  useEffect(() => {
    if (prevNextIcon) {
      prevNextIcon.forEach((icon) => {
        icon.addEventListener("click", () => {
          // Adding click event on both icons
          // If clicked icon is the previous icon, then decrement the current month; otherwise, increment it by 1
          setCurrMonth((prevMonth) => {
            let updatedMonth = icon.id === "prev" ? prevMonth - 1 : prevMonth + 1;
            let updatedYear = currYearRef.current;

            if (updatedMonth < 0 || updatedMonth > 11) {
              const updatedDate = new Date(currYearRef.current, updatedMonth);
              updatedYear = updatedDate.getFullYear();
              updatedMonth = updatedDate.getMonth();
            }

            currYearRef.current = updatedYear;

            return updatedMonth;
          });

          renderCalendar();
        });
      });
    }
  }, [prevNextIcon, renderCalendar]);

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.boxContainer}>
          <div className={styles.outsideBox}>
            <header>
              <p className={currentDate}>{currentDate}</p>
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
        {/* <ul className={styles.days} dangerouslySetInnerHTML={{ __html: daysTag }} /> */}
      </div>
    </>
  );
};

export default Calendar;
