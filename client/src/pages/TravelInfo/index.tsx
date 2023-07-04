import CalendarIcon from "@mui/icons-material/CalendarToday";
import FlightIcon from "@mui/icons-material/Flight";
import GiteIcon from "@mui/icons-material/Gite";
import { IconButton } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ErrorResponse } from "../../api/api-instance";
import { requestEditTravel, requestGetTravelWithInfo } from "../../api/requests/travels-requests";
import Navbar from "../../components/Navbar";
import {
  convertDateInputValueToDate,
  convertDateToDateInputValue,
} from "../../utils/date-utilities";
import styles from "./styles.module.scss";

export default function TravelInfo() {
  const params = useParams();
  const navigate = useNavigate();

  // Travel variables
  const [local, setLocal] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);
  const [proposito, setProposito] = useState<string>("");
  const [numDePessoas, setNumDePessoas] = useState("");
  const [wasEdited, setWasEdited] = useState<boolean>(false);

  // Host variables
  const [hostId, setHostId] = useState<number>(0);
  const [localHost, setLocalHost] = useState<string>("");
  const [dataInicioHost, setDataInicioHost] = useState<Date | null>(null);
  const [dataFimHost, setDataFimHost] = useState<Date | null>(null);
  const [tipoEstadiaHost, setTipoEstadiaHost] = useState<string>("");
  const [precoHost, setPrecoHost] = useState<number>(0);
  const [contatoHost, setContatoHost] = useState<string>("");

  // Transport variables
  const [transportId, setTransportId] = useState<number>(0);
  const [tipoTransporteTransport, setTipoTransporteTransport] = useState<string>("");
  const [localIdaTransport, setLocalIdaTransport] = useState<string>("");
  const [localChegadaTransport, setLocalChegadaTransport] = useState<string>("");
  const [horaSaidaTransport, setHoraSaidaTransport] = useState<Date | null>(null);
  const [horaChegadaTransport, setHoraChegadaTransport] = useState<Date | null>(null);
  const [precoTransport, setPrecoTransport] = useState<number>(0);
  const [contatoTransport, setContatoTransport] = useState<string>("");

  // Travel fetch request
  const fetchTravel = useCallback(async () => {
    const response = await requestGetTravelWithInfo(params.id!);

    if (response instanceof ErrorResponse) {
      alert(response.message);
      return;
    }

    // Set travel variables
    setDataFim(new Date(response.data.endDate));
    setDataInicio(new Date(response.data.startDate));
    setLocal(response.data.local);
    setNumDePessoas(response.data.numParticipants.toString());
    setProposito(response.data.description);

    // Set host variables
    if (response.data.host) {
      const host = response.data.host;

      setHostId(host.id);
      setContatoHost(host.contact);
      setPrecoHost(host.price);
      setDataFimHost(new Date(host.endTime));
      setDataInicioHost(new Date(host.startTime));
      setLocalHost(host.local);
      setTipoEstadiaHost(host.type);
    } else {
      setContatoHost("");
      setPrecoHost(0);
      setDataFimHost(null);
      setDataInicioHost(null);
      setLocalHost("");
      setTipoEstadiaHost("");
    }

    // Set transport variables
    if (response.data.transport) {
      const transport = response.data.transport;

      setTransportId(transport.id);
      setContatoTransport(transport.contacts);
      setHoraChegadaTransport(new Date(transport.endTime));
      setHoraSaidaTransport(new Date(transport.startTime));
      setLocalChegadaTransport(transport.endLocal);
      setLocalIdaTransport(transport.startLocal);
      setPrecoTransport(transport.price);
      setTipoTransporteTransport(transport.type);
    } else {
      setContatoTransport("");
      setHoraChegadaTransport(null);
      setHoraSaidaTransport(null);
      setLocalChegadaTransport("");
      setLocalIdaTransport("");
      setPrecoTransport(0);
      setTipoTransporteTransport("");
    }
  }, [params.id]);

  useEffect(() => {
    fetchTravel();
  }, [fetchTravel]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!dataInicio || !dataFim) {
      alert("Data inválida");
      return;
    }

    const response = await requestEditTravel(parseInt(params.id!), {
      local,
      startDate: dataInicio,
      endDate: dataFim,
      description: proposito,
      numParticipants: parseInt(numDePessoas),
    });

    if (response instanceof ErrorResponse) {
      alert("Erro ao editar viagem\n" + response.message);
      return;
    }

    alert("Viagem editada com sucesso");
    setWasEdited(!wasEdited);
    navigate("/travels");
  }

  const handleCreateHost = () => {
    navigate(`/create-stay/${params.id}`);
  };

  const handleEditHost = () => {
    navigate(`/edit-stay/${hostId}`);
  };

  const handleCreateTransport = () => {
    navigate(`/create-transport/${params.id}`);
  };

  const handleEditTransport = () => {
    navigate(`/edit-transport/${transportId}`);
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
                  value={convertDateToDateInputValue(dataInicio)}
                  onChange={(event) =>
                    setDataInicio(convertDateInputValueToDate(event.target.value))
                  }
                />
              </div>
              <div className="column">
                <label htmlFor="local">Dia de fim:</label>
                <input
                  type="date"
                  placeholder="Data"
                  className={styles.inputDate}
                  required
                  value={convertDateToDateInputValue(dataFim)}
                  onChange={(event) => setDataFim(convertDateInputValueToDate(event.target.value))}
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
          {precoHost === 0 ? (
            <button className={styles.createButton} onClick={handleCreateHost}>
              <GiteIcon />
              <p>Adicionar</p>
              <p>Informações de Estadia</p>
            </button>
          ) : (
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
          )}
        </div>

        <div className={styles.verticalLine}></div>

        <div className={styles.infoBox}>
          {precoTransport === 0 ? (
            <button className={styles.createButton} onClick={handleCreateTransport}>
              <FlightIcon />
              <p>Adicionar</p>
              <p>Informações de Transporte</p>
            </button>
          ) : (
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
                <span>
                  {horaSaidaTransport?.toLocaleString()} até{" "}
                  {horaChegadaTransport?.toLocaleString()}
                </span>
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
          )}
        </div>
      </div>
      {/* TODO: Arrumar uma solução melhor */}
      <Link to={`/schedule/${params.id}`} id={styles.schedule_link}>
        <IconButton id={styles.schedule_link}>
          <CalendarIcon fontSize="large" />
        </IconButton>
      </Link>
    </Navbar>
  );
}
