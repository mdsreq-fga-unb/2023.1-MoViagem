import { parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorResponse } from "../../api/api-instance.ts";
import { EventResponseDTO } from "../../api/dto/travels-dto.ts";
import { requestGetEvents } from "../../api/requests/travels-requests.ts";
import Navbar from "../../components/Navbar/index.tsx";
import EventModal from "./Modal/eventModal.tsx";
import styles from "./styles.module.scss";
import EventInfoModal from "./EventInfoModal/index.tsx";

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
  const [diffYears, setDiffYears] = useState<number>(0); // Keeps track of the difference between the current year in rl and the year of the calendar
  const currYearRef = useRef<number>(date.getFullYear());
  const [events, setEvents] = useState<EventResponseDTO[]>([]);
  const [dayEvents, setDayEvents] = useState<EventResponseDTO[]>([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventResponseDTO>();

  // Render the calendar
  const renderCalendar = useCallback(() => {
    const firstDayOfMonth = new Date(currYearRef.current, currMonth, 1).getDay();
    const lastDateOfMonth = new Date(currYearRef.current, currMonth + 1, 0).getDate();
    const lastDayOfMonth = new Date(currYearRef.current, currMonth, lastDateOfMonth).getDay();
    const lastDateOfLastMonth = new Date(currYearRef.current, currMonth, 0).getDate();

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

    setAllMonths(months);
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

    const selectedDateEvent = new Date(currYearRef.current, currMonth, date.getDate());

    // Add inactive days from the previous month
    for (let i = firstDayOfMonth; i > 0; i--) {
      updatedDays.push(
        <div
          key={`prev-${i}`}
          className={styles.inactive}
          onClick={() =>
            handleDayClick(lastDateOfLastMonth - i + 1, currMonth - 1, currYearRef.current)
          }
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

  const fetchEvents = async () => {
    const response = await requestGetEvents(params.id!);

    if (response instanceof ErrorResponse) {
      alert(response.message);
      return;
    }

    setEvents(response.data);

    const dayEvents: EventResponseDTO[] = [];

    response.data.forEach((event) => {
      const eventDate = new Date(event.eventTime);
      const currentDate = parse(currentDateForSidebar, "d 'de' MMMM 'de' yyyy", new Date(), {
        locale: ptBR,
      });

      if (
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getDate() === currentDate.getDate() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      ) {
        dayEvents.push(event);
      }
    });
    dayEvents.sort((a, b) => {
      const timeA = new Date(a.eventTime).getTime();
      const timeB = new Date(b.eventTime).getTime();
      return timeA - timeB;
    });

    setDayEvents(dayEvents);
  };

  useEffect(() => {
    renderCalendar();
  }, [renderCalendar]);

  useEffect(() => {
    fetchEvents();
  }, [currentDateForSidebar]);

  // Handle click on previous/next month icon
  const handleIconClick = (increment: number) => {
    setCurrMonth((prevMonth) => {
      let updatedMonth = prevMonth + increment;
      let updatedYear = date.getFullYear() + diffYears;

      if (updatedMonth < 0) {
        updatedMonth = 11;
        updatedYear--;
        setDiffYears(diffYears - 1);
      } else if (updatedMonth > 11) {
        updatedMonth = 0;
        updatedYear++;
        setDiffYears(diffYears + 1);
      }

      currYearRef.current = updatedYear; // Update year reference

      return updatedMonth;
    });
  };

  const handleEventInfoModalOpen = (event: EventResponseDTO) => {
    setSelectedEvent(event)
    setShowEventModal(true);
  };

  const handleEventInfoModalClose = () => {
    setShowEventModal(false);
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
          {showEventModal && selectedDate && selectedEvent && (
            <EventInfoModal
              selectedEvent={selectedEvent}
              selectedDate={selectedDate}
              closeModal={() => handleEventInfoModalClose()}
            />
          )}
          <div className={styles.sidebar}>
            {/* Sidebar Content */}
            <h2>[ {currentDateForSidebar} ]</h2>
            {/* Fetch and display activities for the selected date */}
            <div className={styles.activities}>
              {dayEvents.map((event) => (
                <button className={styles.insideBox} onClick={() => handleEventInfoModalOpen(event)}>
                  <div className={styles.infoBox}>
                    <h3>{event.departureLocation}</h3>
                    <div className={styles.infoText}>
                      <p>{new Date(event.eventTime).toLocaleTimeString()}</p>
                    </div>
                  </div>
                </button>
              ))}
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
                  {allMonths[currMonth - 1]
                    ? allMonths[currMonth - 1] + " " + currYearRef.current
                    : allMonths[currMonth + 11] + " " + (currYearRef.current - 1)}
                </button>
                <button className={styles.current}>
                  {allMonths[currMonth] + " " + currYearRef.current}
                </button>
                <button className={styles.next} onClick={() => handleIconClick(1)}>
                  {allMonths[currMonth + 1]
                    ? allMonths[currMonth + 1] + " " + currYearRef.current
                    : allMonths[currMonth - 11] + " " + (currYearRef.current + 1)}
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
