import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/index.tsx";
import EventModal from "./Modal/eventModal.tsx";
import styles from "./styles.module.scss";

const Schedule: React.FC = () => {
  const params = useParams();
  const date = useMemo(() => new Date(), []);
  // const [currentDate, setCurrentDate] = useState("");
  const [currentDateForSidebar, setCurrentDateForSidebar] = useState("");
  const [currMonth, setCurrMonth] = useState<number>(date.getMonth());
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [days, setDays] = useState<JSX.Element[]>([]); // Declare days as a state variable
  const [allMonths, setAllMonths] = useState<string[]>([]);
  const [diffYears, setDiffYears] = useState<number>(0)
  const currYearRef = useRef<number>(date.getFullYear());

  // Render the calendar
  const renderCalendar = useCallback(() => {
    const firstDayOfMonth = new Date(date.getFullYear(), currMonth, 1).getDay();
    const lastDateOfMonth = new Date(date.getFullYear(), currMonth + 1, 0).getDate();
    const lastDayOfMonth = new Date(date.getFullYear(), currMonth, lastDateOfMonth).getDay();
    const lastDateOfLastMonth = new Date(date.getFullYear(), currMonth, 0).getDate();

    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
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

    setAllMonths(months)
    const updatedDays: JSX.Element[] = [];

    // Handle day click event
    const handleDayClick = (day: number, month: number, year: number) => {
      const selectedDateEvent = new Date(year, month, day);
      setSelectedDate(selectedDateEvent);

      const currentDayForSidebar = selectedDateEvent.toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      setCurrentDateForSidebar(currentDayForSidebar);

      // setShowModal(true);
    };

    const selectedDateEvent = new Date(currYearRef.current, currMonth);

    // Add inactive days from the previous month
    for (let i = firstDayOfMonth; i > 0; i--) {
      updatedDays.push(
        <div
          key={`prev-${i}`}
          className={styles.inactive}
          onClick={() => handleDayClick(lastDateOfLastMonth - i + 1, currMonth - 1, currYearRef.current)}
        >
          {lastDateOfLastMonth - i + 1}
        </div>
      );
    }

    // Add days of the current month
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday =
        i === date.getDate() &&
        currMonth === date.getMonth() &&
        date.getFullYear() === date.getFullYear()
          ? styles.active
          : "";
      updatedDays.push(
        <div
          key={`curr-${i}`}
          className={`${isToday} ${styles.days}`}
          onClick={() => handleDayClick(i, currMonth, currYearRef.current)}
        >
          {i}
        </div>
      );
    }

    // Add inactive days from the next month
    for (let i = lastDayOfMonth; i < 6; i++) {
      updatedDays.push(
        <div
          key={`next-${i}`}
          className={styles.inactive}
          onClick={() => handleDayClick(i - lastDayOfMonth + 1, currMonth + 1, currYearRef.current)}
        >
          {i - lastDayOfMonth + 1}
        </div>
      );
    }

    // const currentDay = date.getDate();

    const currentDayForSidebar = selectedDateEvent.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    setSelectedDate(selectedDateEvent);
    setCurrentDateForSidebar(`${currentDayForSidebar}`);

    // setCurrentDate(`${currentDay} ${months[currMonth]} ${currYearRef.current}`);
    setDays(updatedDays);
  }, [currMonth, date]);

  useEffect(() => {
    renderCalendar();
  }, [renderCalendar]);

  // Handle click on previous/next month icon
  const handleIconClick = (increment: number) => {
    setCurrMonth((prevMonth) => {
      let updatedMonth = prevMonth + increment;
      let updatedYear = date.getFullYear() + diffYears;

      if (updatedMonth < 0) {
        updatedMonth = 11;
        updatedYear--;
        setDiffYears(diffYears - 1)
      } else if (updatedMonth > 11) {
        updatedMonth = 0;
        updatedYear++;
        setDiffYears(diffYears + 1)
      }

      currYearRef.current = updatedYear; // Update year reference

      return updatedMonth;
    });
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Navbar pageName="Calendário" selectedPage="CALENDAR">
      <div className={styles.pageContainer}>
        <div className={styles.boxContainer}>
          {showModal && selectedDate && (
            <EventModal
              travelId={params.id!}
              selectedDate={selectedDate}
              closeModal={() => handleModalClose()}
            />
          )}
          <div className={styles.sidebar}>
            {/* Sidebar Content */}
            <h2>[ {currentDateForSidebar} ]</h2>
            {/* Fetch and display activities for the selected date */}
            <div className={styles.activities}>
              <div>Activity 1</div>
              <div>Activity 2</div>
              <div>Activity 3</div>
            </div>
            <div className={styles.buttonOutsideContainer}>
              <button className={styles.buttonContainer} onClick={handleModalOpen}> 
                Criar atividade
              </button>
            </div>
          </div>
          <div className={styles.calendar}>
            <header>
              <div className={styles.monthIcons}>
                <button className={styles.prev} onClick={() => handleIconClick(-1)}>
                  {
                    allMonths[currMonth - 1]
                      ? allMonths[currMonth - 1] + " " + (currYearRef.current)
                      : allMonths[currMonth + 11] + " " + (currYearRef.current - 1)
                  }
                </button>
                <button className={styles.current}>
                  {
                    allMonths[currMonth] + " " + (currYearRef.current)
                  }
                </button>
                <button className={styles.next} onClick={() => handleIconClick(1)}>
                  {
                    allMonths[currMonth + 1]
                      ? allMonths[currMonth + 1] + " " + (currYearRef.current)
                      : allMonths[currMonth - 11] + " " + (currYearRef.current + 1)
                  }
                </button>
              </div>
            </header>
            <div className={styles.weekDays}>
              <div className={styles.weekDaysGridLayout}>
                <div>Domingo</div>
                <div>Segunda</div>
                <div>Terça</div>
                <div>Quarta</div>
                <div>Quinta</div>
                <div>Sexta</div>
                <div>Sábado</div>
              </div>
            </div>
            <div className={styles.days}>
              <div className={styles.gridLayout}>{days}</div>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Schedule;
