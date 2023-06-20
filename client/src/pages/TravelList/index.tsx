import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ErrorResponse } from "../../api/api-instance";
import { TravelsResponseDTO } from "../../api/dto/travels-dto";
import { getTravels } from "../../api/requests/travels-requests";
import FundoViagem from "../../assets/FundoViagem.png";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";

export default function TravelList() {
  // Travel variables
  const [travels, setTravels] = useState<TravelsResponseDTO[]>([]);

  // Travel fetch request
  const fetchTravel = async () => {
    const response = await getTravels();

    if (response instanceof ErrorResponse) {
      alert(response.message);
      return;
    }

    setTravels(response.data);
  };

  useEffect(() => {
    fetchTravel();
  }, []);

  return (
    <Navbar pageName="Viagens" selectedPage="TRAVELS">
      <div className={styles.pageContainer}>
        <Link to="/create-travel" style={{ textDecoration: "none" }}>
          <button id={styles.createTravelButton}>
            <MenuBookIcon fontSize="large" />
            <div id={styles.buttonText}>Criar Viagem</div>
          </button>
        </Link>
        <div className={styles.outsideBox}>
          {travels.map((travel) => (
            <Link to={`/travel-info/${travel.id}`} style={{ textDecoration: "none" }}>
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
          ))}
        </div>
      </div>
    </Navbar>
  );
}
