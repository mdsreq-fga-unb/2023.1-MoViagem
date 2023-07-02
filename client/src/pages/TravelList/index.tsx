import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ErrorResponse } from "../../api/api-instance";
import { TravelsResponseDTO } from "../../api/dto/travels-dto";
import { requestGetTravels } from "../../api/requests/travels-requests";
import FundoViagem from "../../assets/FundoViagem.png";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";

export default function TravelList() {
  // Travel variables
  const [travels, setTravels] = useState<TravelsResponseDTO[]>([]);
  const [pastTravels, setPastTravels] = useState<TravelsResponseDTO[]>([]);
  const [currTravels, setCurrTravels] = useState<TravelsResponseDTO[]>([]);
  const [futureTravels, setFutureTravels] = useState<TravelsResponseDTO[]>([]);
  const [currTravelsFilter, setCurrTravelsFilter] = useState<boolean>(false);
  const [pastTravelsFilter, setPastTravelsFilter] = useState<boolean>(false);
  const [futureTravelsFilter, setFutureTravelsFilter] = useState<boolean>(false);
  const currentDate = new Date();

  // Travel fetch request
  const fetchTravel = async () => {
    const response = await requestGetTravels();

    if (response instanceof ErrorResponse) {
      alert(response.message);
      return;
    }

    setTravels(response.data);

    travels.map((travel) => {
      const travelStart = new Date(travel.startDate);
      const travelEnd = new Date(travel.endDate);
      if (travelStart > currentDate) {
        setFutureTravels([...futureTravels, travel]);
      }
      else if (travelEnd < currentDate) {
        setPastTravels([...pastTravels, travel]);
      }
      else if (travelStart < currentDate && travelEnd > currentDate) {
        setCurrTravels([...currTravels, travel]);
      }
    });
  };

  const handleFilter = (filter: number) => {
    if (filter === 1) {
      setPastTravelsFilter(!pastTravelsFilter)
      setCurrTravelsFilter(false)
      setFutureTravelsFilter(false)
    } else if (filter === 2) {
      setPastTravelsFilter(false)
      setCurrTravelsFilter(!currTravelsFilter)
      setFutureTravelsFilter(false)
    } else if (filter === 3) {
      setPastTravelsFilter(false)
      setCurrTravelsFilter(false)
      setFutureTravelsFilter(!futureTravelsFilter)
    }
  }

  useEffect(() => {
    fetchTravel();
  }, []);

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
            <button className={pastTravelsFilter ? styles.active : styles.filterButton} onClick={() => handleFilter(1)}>
              Viagens Passadas
            </button>
            <button className={currTravelsFilter ? styles.active : styles.filterButton} onClick={() => handleFilter(2)}>
              Viagens Atuais
            </button>
            <button className={futureTravelsFilter ? styles.active : styles.filterButton} onClick={() => handleFilter(3)}>
              Viagens Futuras
            </button>
          </section>
        </header>
        <div className={styles.outsideBox}>
          {!pastTravelsFilter && !currTravelsFilter && !futureTravelsFilter
            ?
            travels.map((travel) => (
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
            :
            <></>
          }
          {pastTravelsFilter && !currTravelsFilter && !futureTravelsFilter
            ?
            pastTravels.map((travel) => (
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
            :
            <></>
          }
          {!pastTravelsFilter && currTravelsFilter && !futureTravelsFilter
            ?
            currTravels.map((travel) => (
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
            :
            <></>
          }
          {!pastTravelsFilter && !currTravelsFilter && futureTravelsFilter
            ?
            futureTravels.map((travel) => (
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
            :
            <></>
          }
        </div>
      </div>
    </Navbar>
  );
}
