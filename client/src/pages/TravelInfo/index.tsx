import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorResponse } from "../../api/api-instance";
import { editTravel, getHost, getTrasnsport, getTravel } from "../../api/requests/travels-requests";
// import useAuth from "../../auth/context/auth-hook";
import FlightIcon from "@mui/icons-material/Flight";
import GiteIcon from "@mui/icons-material/Gite";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";

export default function TravelInfo() {
  // const auth = useAuth();
  const params = useParams();
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

  // Travel variables
  const [local, setLocal] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);
  const [proposito, setProposito] = useState<string>("");
  const [numDePessoas, setNumDePessoas] = useState("");
  const [wasEdited, setWasEdited] = useState<boolean>(false);
  
  // Host variables
  const [localHost, setLocalHost] = useState<string>("");
  const [dataInicioHost, setDataInicioHost] = useState<Date | null>(null);
  const [dataFimHost, setDataFimHost] = useState<Date | null>(null);
  const [tipoEstadiaHost, setTipoEstadiaHost] = useState<string>("");
  const [precoHost, setPrecoHost] = useState<number>(0);
  const [contatoHost, setContatoHost] = useState<string>("");

  // Transport variables
  const [tipoTransporteTransport, setTipoTransporteTransport] = useState<string>("");
  const [localIdaTransport, setLocalIdaTransport] = useState<string>("");
  const [localChegadaTransport, setLocalChegadaTransport] = useState<string>("");
  const [horaSaidaTransport, setHoraSaidaTransport] = useState<string>("");
  const [horaChegadaTransport, setHoraChegadaTransport] = useState<string>("");
  const [precoTransport, setPrecoTransport] = useState<number>(0);
  const [contatoTransport, setContatoTransport] = useState<string>("");

  // Travel fetch request
  const fetchTravel = async () => {
    const response = await getTravel(params.id!);
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

  // Host fetch request
  const fetchHost = async () => {
    const response = await getHost(params.id!);
    if (response instanceof ErrorResponse) {
      console.log(response.message);
      return;
    }
    setContatoHost(response.data.contact);
    setPrecoHost(response.data.price);
    setDataFimHost(new Date(response.data.endTime));
    setDataInicioHost(new Date(response.data.startTime));
    setLocalHost(response.data.local);
    setTipoEstadiaHost(response.data.type);
  };

  // Transport fetch request
  const fetchTransport = async () => {
    const response = await getTrasnsport(params.id!);
    if (response instanceof ErrorResponse) {
      console.log(response.message);
      return;
    }
    setContatoTransport(response.data.contacts);
    setHoraChegadaTransport(response.data.startTime);
    setHoraSaidaTransport(response.data.endTime);
    setLocalChegadaTransport(response.data.endLocal);
    setLocalIdaTransport(response.data.startLocal);
    setPrecoTransport(response.data.price);
    setTipoTransporteTransport(response.data.type);
  };

  useEffect(() => {
    fetchTravel();
    fetchHost();
    fetchTransport();
  }, [wasEdited]);

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
    setWasEdited(!wasEdited);
  }

  const handleCreateHost = () => {
    navigate(`/create-stay/${params.id}`, { replace: true });
  };

  const handleEditHost = () => {
    navigate(`/edit-stay/${params.id}`, { replace: true });
  };

  const handleCreateTransport = () => {
    navigate(`/create-transport/${params.id}`, { replace: true });
  };

  const handleEditTransport = () => {
    navigate(`/edit-transport/${params.id}`, { replace: true });
  };

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
              SALVAR DADOS
            </button>
          </form>
        </div>

        <div className={styles.verticalLine}></div>

        <div className={styles.infoBox}>
          {
            precoHost === 0
            ?
            <button className={styles.createButton} onClick={handleCreateHost}>
              <GiteIcon />
              <p>Adicionar</p>
              <p>Informações de Estadia</p>
            </button>
            :
            <div className={styles.cardBox}>
                Tipo de estadia:
              <div className={styles.cardInfo}>
                <span>{tipoEstadiaHost}</span>
              </div>
                Dia de chegada:
              <div className={styles.cardInfo}>
                <span>{dataInicioHost ? dataInicioHost.toISOString().split("T")[0] : ""}</span>
              </div>
                Dia de saída:
              <div className={styles.cardInfo}>
                <span>{dataFimHost ? dataFimHost.toISOString().split("T")[0] : ""}</span>
              </div>
                Local:
              <div className={styles.cardInfo}>
                <span>{localHost}</span>
              </div>
                Preço:
              <div className={styles.cardInfo}>
                <span>{precoHost}</span>
              </div>
                Contato:
              <div className={styles.cardInfo}>
                <span>{contatoHost}</span>
              </div>
              <button className={styles.editButton} onClick={handleEditHost}>
                <GiteIcon />
                <p>Editar Estadia</p>
              </button>
            </div>
          }
        </div>

        <div className={styles.verticalLine}></div>

        <div className={styles.infoBox}>
          {
            precoTransport === 0
            ?
            <button className={styles.createButton} onClick={handleCreateTransport}>
              <FlightIcon />
              <p>Adicionar</p>
              <p>Informações de Transporte</p>
            </button>
            :
            <div className={styles.cardBox}>
                Tipo de transporte:
              <div className={styles.cardInfo}>
                <span>{tipoTransporteTransport}</span>
              </div>
                Local de saída:
              <div className={styles.cardInfo}>
                <span>{localIdaTransport}</span>
              </div>
                Local de chegada:
              <div className={styles.cardInfo}>
                <span>{localChegadaTransport}</span>
              </div>
                Duração do percurso:
              <div className={styles.cardInfo}>
                <span>{horaSaidaTransport} até {horaChegadaTransport}</span>
              </div>
                Preço:
              <div className={styles.cardInfo}>
                <span>{precoTransport}</span>
              </div>
                Contato:
              <div className={styles.cardInfo}>
                <span>{contatoTransport}</span>
              </div>
              <button className={styles.editButton} onClick={handleEditTransport}>
                <FlightIcon />
                <p>Editar Transporte</p>
              </button>
            </div>
          }
        </div>
      </div>
    </Navbar>
  );
}
