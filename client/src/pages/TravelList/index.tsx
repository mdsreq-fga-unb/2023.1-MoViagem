import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ErrorResponse } from "../../api/api-instance";
import { getTravel } from "../../api/requests/travels-requests";
// import useAuth from "../../auth/context/auth-hook";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FundoViagem from "../../assets/FundoViagem.png"

export default function TravelList() {
  // const auth = useAuth();
  // const params = useParams();

  // async function getTravelsList() {
  //   if (auth.userInfo == null) {
  //     throw "userInfo context is null";
  //   }

  //   const travels = await getTravels(auth.userInfo.id.toString());
  //   // console.log(travels.data);
  //   return travels;
  // }

  // getTravelsList();

  // Travel variables
  const [local, setLocal] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);
  const [proposito, setProposito] = useState<string>("");
  const [numDePessoas, setNumDePessoas] = useState("");

  // Travel fetch request
  const fetchTravel = async () => {
    const response = await getTravel("1");
    if (response instanceof ErrorResponse) {
      console.log(response.message);
      return;
    }
    setDataFim(new Date(response.data.endDate));
    setDataInicio(new Date(response.data.startDate));
    setLocal(response.data.local);
    setNumDePessoas(response.data.numParticipants.toString());
    setProposito(response.data.description);
  };

  useEffect(() => {
    fetchTravel();
  }, []);

  return (
    <Navbar pageName="Viagens" selectedPage="TRAVELS">
      <div className={styles.pageContainer}>
        <Link to="/create-travel" replace style={{ textDecoration: "none" }}>
          <button id={styles.createTravelButton}>
            <MenuBookIcon fontSize="large" />
            <div id={styles.buttonText}>Criar Viagem</div>
          </button>
        </Link>
        <div className={styles.outsideBox}>
          <Link to="/travel-info/1" replace style={{ textDecoration: "none" }}>
            <button className={styles.insideBox}>
              <div className={styles.infoBox}>
                <h3>{local}</h3>
                <img alt="Fundo Viagem" src={FundoViagem}></img>
                <div className={styles.infoText}>
                  <p>{dataInicio ? dataInicio.toISOString().split("T")[0] : ""} até {dataFim ? dataFim.toISOString().split("T")[0] : ""}</p>
                </div>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </Navbar>
  );
}
