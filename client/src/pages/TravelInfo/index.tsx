import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorResponse } from "../../api/api-instance";
import { editTravel } from "../../api/requests/travels-requests";
// import useAuth from "../../auth/context/auth-hook";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";
import GiteIcon from '@mui/icons-material/Gite';
import FlightIcon from '@mui/icons-material/Flight';

export default function TravelInfo() {
  // const auth = useAuth();
  const navigate = useNavigate();

  // async function getTravelsList() {
  //   if (auth.userInfo == null) {
  //     throw "userInfo context is null";
  //   }

  //   const travels = await getTravels(auth.userInfo.id.toString());
  //   // console.log(travels.data);
  //   return travels;
  // }

  // getTravelsList();

  const [local, setLocal] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);
  const [proposito, setProposito] = useState<string>("");
  const [numDePessoas, setNumDePessoas] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!dataInicio || !dataFim) {
      alert("Data inválida");
      return;
    }

    const response = await editTravel({
      local: local,
      startDate: dataInicio,
      endDate: dataFim,
      description: proposito,
      numParticipants: parseInt(numDePessoas),
    });

    if (response instanceof ErrorResponse) {
      alert("Erro ao editar viagem\n" + response.message);
      return;
    }

    // TODO: Redirecionar para a página de lista de viagens
    alert("Viagem editada com sucesso");
  }

  const handleCreateHost = () => {
    navigate("/create-stay", { replace: false})
  }

  const handleCreateTransport = () => {
    navigate("/create-transport", { replace: false})
  }

  return (
    <Navbar pageName="Informações da Viagem">
    <div className={styles.pageContainer}>
      <div className={styles.outsideBox}>
        <form className={styles.insideBox} onSubmit={handleSubmit}>
          <h2>Dados da Viagem:</h2>
          <div className={styles.inputContainer}>
            <label htmlFor="local">Local:</label>
            <input
              type="text"
              name="local"
              placeholder="Digite aqui o local da viagem"
              className={styles.inputBox}
              required
              value={local}
              onChange={(event) => {
                setLocal(event.target.value);
              }}
            />
          </div>
          <div className={styles.inputGroup}>
            <div className="column">
              <label htmlFor="local">Dia de início:</label>
              <input
                type="date"
                placeholder="Data"
                className={styles.inputDate}
                required
                value={dataInicio ? dataInicio.toISOString().split("T")[0] : ""}
                onChange={(event) => {
                  const date = Date.parse(event.target.value);
                  if (isNaN(date)) {
                    setDataInicio(null);
                  } else {
                    setDataInicio(new Date(date));
                  }
                }}
              />
            </div>
            <div className="column">
              <label htmlFor="local">Dia de fim:</label>
              <input
                type="date"
                placeholder="Data"
                className={styles.inputDate}
                required
                value={dataFim ? dataFim.toISOString().split("T")[0] : ""}
                onChange={(event) => {
                  const date = Date.parse(event.target.value);
                  if (isNaN(date)) {
                    setDataFim(null);
                  } else {
                    setDataFim(new Date(date));
                  }
                }}
              />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="proposito">Proposito:</label>
            <textarea
              placeholder=""
              name="proposito"
              rows={3}
              className={styles.textAreaBox}
              required
              value={proposito}
              onChange={(event) => {
                setProposito(event.target.value);
              }}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="numDePessoas">Numero de Pessoas:</label>
            <input
              type="Number"
              name="numDePessoas"
              placeholder="Nº"
              className={styles.inputNum}
              required
              value={numDePessoas}
              onChange={(event) => {
                setNumDePessoas(event.target.value);
              }}
            />
          </div>

          <button className={styles.submitButton} type="submit">
            EDITAR
          </button>
        </form>
      </div>

      <div className={styles.verticalLine}></div>
      
      <div className={styles.infoBox}>      
        <button className={styles.createButton} onClick={handleCreateHost}>
          <GiteIcon />
          <p>Adicionar</p>
          <p>Informações de Estadia</p>
        </button>
      </div>
        
      <div className={styles.verticalLine}></div>

      <div className={styles.infoBox}>      
        <button className={styles.createButton} onClick={handleCreateTransport}>
          <FlightIcon />
          <p>Adicionar</p>
          <p>Informações de Transporte</p>
        </button>
      </div>

    </div>
  </Navbar>
  );
}
