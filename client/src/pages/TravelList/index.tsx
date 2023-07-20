import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ErrorResponse } from "../../api/api-instance";
import { TravelsResponseDTO } from "../../api/dto/travels-dto";
import {
  requestGetTravels,
  requestGetTravelsBeingGuest,
} from "../../api/requests/travels-requests";
import FundoViagem from "../../assets/FundoViagem.png";
import ViagemPassada from "../../assets/PessoaVoltandoDeViagem.png";
import ViagemAtual from "../../assets/PessoaNaViagem.png";
import ViagemFutura from "../../assets/PessoaArrumandoMalas.png";
import ViagemEmGrupo from "../../assets/GrupoIndoViajar.png";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";

export default function TravelList() {
  // Travel variables
  const [travels, setTravels] = useState<TravelsResponseDTO[]>([]);
  const [guestTravels, setGuestTravels] = useState<TravelsResponseDTO[]>([]);
  const [pastTravels, setPastTravels] = useState<TravelsResponseDTO[]>([]);
  const [currTravels, setCurrTravels] = useState<TravelsResponseDTO[]>([]);
  const [futureTravels, setFutureTravels] = useState<TravelsResponseDTO[]>([]);

  const [currTravelsFilter, setCurrTravelsFilter] = useState<boolean>(false);
  const [pastTravelsFilter, setPastTravelsFilter] = useState<boolean>(false);
  const [futureTravelsFilter, setFutureTravelsFilter] = useState<boolean>(false);
  const [guestTravelsFilter, setGuestTravelsFilter] = useState<boolean>(false);

  const currentDate = useMemo(() => new Date(), []);

  // Travel fetch request
  const fetchTravel = useCallback(async () => {
    const response = await requestGetTravels();

    if (response instanceof ErrorResponse) {
      alert(response.message);
      return;
    }

    setTravels(response.data);

    const futureTravels: TravelsResponseDTO[] = [];
    const pastTravels: TravelsResponseDTO[] = [];
    const currTravels: TravelsResponseDTO[] = [];

    response.data.forEach((travel) => {
      const travelStart = new Date(travel.startDate);
      const travelEnd = new Date(travel.endDate);
      if (travelStart > currentDate) {
        futureTravels.push(travel);
      } else if (travelEnd < currentDate) {
        pastTravels.push(travel);
      } else if (travelStart < currentDate && travelEnd > currentDate) {
        currTravels.push(travel);
      }
    });

    setFutureTravels(futureTravels);
    setPastTravels(pastTravels);
    setCurrTravels(currTravels);

    const responseGuest = await requestGetTravelsBeingGuest();

    if (responseGuest instanceof ErrorResponse) {
      alert(responseGuest.message);
      return;
    }

    setGuestTravels(responseGuest.data);
  }, [currentDate]);

  const handleFilter = (filter: number) => {
    if (filter === 1) {
      setPastTravelsFilter(!pastTravelsFilter);
      setCurrTravelsFilter(false);
      setFutureTravelsFilter(false);
      setGuestTravelsFilter(false);
    } else if (filter === 2) {
      setPastTravelsFilter(false);
      setCurrTravelsFilter(!currTravelsFilter);
      setFutureTravelsFilter(false);
      setGuestTravelsFilter(false);
    } else if (filter === 3) {
      setPastTravelsFilter(false);
      setCurrTravelsFilter(false);
      setFutureTravelsFilter(!futureTravelsFilter);
      setGuestTravelsFilter(false);
    } else if (filter === 4) {
      setPastTravelsFilter(false);
      setCurrTravelsFilter(false);
      setFutureTravelsFilter(false);
      setGuestTravelsFilter(!guestTravelsFilter);
    }
  };

  useEffect(() => {
    fetchTravel();
  }, [fetchTravel]);

  return (
    <Navbar pageName="Viagens" selectedPage="TRAVELS">
      <div className={styles.pageContainer}>
        <header className={styles.listHeader}>
          <Link to="/create-travel" style={{ textDecoration: "none" }}>
            <button id={styles.createTravelButton}>
              <MenuBookIcon fontSize="large" />
              <div id={styles.buttonText}>Criar Viagem</div>
            </button>
          </Link>
          <section className={styles.filterList}>
            <h2>Filtrar Viagens:</h2>
            <button
              className={pastTravelsFilter ? styles.active : styles.filterButton}
              onClick={() => handleFilter(1)}
            >
              Viagens Passadas
            </button>
            <button
              className={currTravelsFilter ? styles.active : styles.filterButton}
              onClick={() => handleFilter(2)}
            >
              Viagens Atuais
            </button>
            <button
              className={futureTravelsFilter ? styles.active : styles.filterButton}
              onClick={() => handleFilter(3)}
            >
              Viagens Futuras
            </button>
            <button
              className={guestTravelsFilter ? styles.active : styles.filterButton}
              onClick={() => handleFilter(4)}
            >
              Viagens como Convidado
            </button>
          </section>
        </header>
        <div className={styles.bodyContainer}>
          <section className={styles.outsideBox}>
            {!pastTravelsFilter &&
            !currTravelsFilter &&
            !futureTravelsFilter &&
            !guestTravelsFilter ? (
              travels
                .map((travel) => (
                  <Link
                    key={travel.id}
                    to={`/travel-info/${travel.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <button className={styles.insideBox}>
                      <div className={styles.infoBox}>
                        <h3>{travel.local}</h3>
                        <img alt="Fundo Viagem" src={FundoViagem}></img>
                        <div className={styles.infoText}>
                          <p>
                            {new Date(travel.startDate).toLocaleDateString()} até{" "}
                            {new Date(travel.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </button>
                  </Link>
                ))
                .concat(
                  guestTravels.map((travel) => (
                    <Link
                      key={travel.id}
                      to={`/travel-info/${travel.id}?guest=true`}
                      style={{ textDecoration: "none" }}
                    >
                      <button className={styles.insideBox}>
                        <div className={styles.infoBox}>
                          <h3>{travel.local}</h3>
                          <img alt="Fundo Viagem" src={FundoViagem}></img>
                          <div className={styles.infoText}>
                            <p>
                              {new Date(travel.startDate).toLocaleDateString()} até{" "}
                              {new Date(travel.endDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </button>
                    </Link>
                  ))
                )
            ) : (
              <></>
            )}
            {pastTravelsFilter &&
            !currTravelsFilter &&
            !futureTravelsFilter &&
            !guestTravelsFilter ? (
              pastTravels.map((travel) => (
                <Link
                  key={travel.id}
                  to={`/travel-info/${travel.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <button className={styles.insideBox}>
                    <div className={styles.infoBox}>
                      <h3>{travel.local}</h3>
                      <img alt="Fundo Viagem" src={ViagemPassada}></img>
                      <div className={styles.infoText}>
                        <p>
                          {new Date(travel.startDate).toLocaleDateString()} até{" "}
                          {new Date(travel.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </button>
                </Link>
              ))
            ) : (
              <></>
            )}
            {!pastTravelsFilter &&
            currTravelsFilter &&
            !futureTravelsFilter &&
            !guestTravelsFilter ? (
              currTravels.map((travel) => (
                <Link
                  key={travel.id}
                  to={`/travel-info/${travel.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <button className={styles.insideBox}>
                    <div className={styles.infoBox}>
                      <h3>{travel.local}</h3>
                      <img alt="Fundo Viagem" src={ViagemAtual}></img>
                      <div className={styles.infoText}>
                        <p>
                          {new Date(travel.startDate).toLocaleDateString()} até{" "}
                          {new Date(travel.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </button>
                </Link>
              ))
            ) : (
              <></>
            )}
            {!pastTravelsFilter &&
            !currTravelsFilter &&
            futureTravelsFilter &&
            !guestTravelsFilter ? (
              futureTravels.map((travel) => (
                <Link
                  key={travel.id}
                  to={`/travel-info/${travel.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <button className={styles.insideBox}>
                    <div className={styles.infoBox}>
                      <h3>{travel.local}</h3>
                      <img alt="Fundo Viagem" src={ViagemFutura}></img>
                      <div className={styles.infoText}>
                        <p>
                          {new Date(travel.startDate).toLocaleDateString()} até{" "}
                          {new Date(travel.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </button>
                </Link>
              ))
            ) : (
              <></>
            )}
            {!pastTravelsFilter &&
            !currTravelsFilter &&
            !futureTravelsFilter &&
            guestTravelsFilter ? (
              guestTravels.map((travel) => (
                <Link
                  key={travel.id}
                  to={`/travel-info/${travel.id}?guest=true`}
                  style={{ textDecoration: "none" }}
                >
                  <button className={styles.insideBox}>
                    <div className={styles.infoBox}>
                      <h3>{travel.local}</h3>
                      <img alt="Fundo Viagem" src={ViagemEmGrupo}></img>
                      <div className={styles.infoText}>
                        <p>
                          {new Date(travel.startDate).toLocaleDateString()} até{" "}
                          {new Date(travel.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </button>
                </Link>
              ))
            ) : (
              <></>
            )}
          </section>
        </div>
      </div>
    </Navbar>
  );
}
