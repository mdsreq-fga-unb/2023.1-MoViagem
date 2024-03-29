import CalendarIcon from "@mui/icons-material/CalendarToday";
import FlightIcon from "@mui/icons-material/Flight";
import GiteIcon from "@mui/icons-material/Gite";
import GroupsIcon from "@mui/icons-material/Groups";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Switch,
} from "@mui/material";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ErrorResponse } from "../../api/api-instance";
import {
  requestDeleteTravel,
  requestEditTravel,
  requestGetTravelWithInfo,
} from "../../api/requests/travels-requests";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";

interface TravelNotifications {
  Thunderstorm: boolean;
  Drizzle: boolean;
  Rain: boolean;
  Snow: boolean;
  Atmosphere: boolean;
  Clouds: boolean;
  Clear: boolean;
}

export default function TravelInfo() {
  const params = useParams();
  const searchParams = useSearchParams()[0];
  const navigate = useNavigate();

  // Travel variables
  const [local, setLocal] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");
  const [proposito, setProposito] = useState<string>("");
  const [numDePessoas, setNumDePessoas] = useState("");
  const [wasEdited, setWasEdited] = useState<boolean>(false);

  // Host variables
  const [hostId, setHostId] = useState<number>(0);
  const [localHost, setLocalHost] = useState<string>("");
  const [dataInicioHost, setDataInicioHost] = useState<string>("");
  const [dataFimHost, setDataFimHost] = useState<string>("");
  const [tipoEstadiaHost, setTipoEstadiaHost] = useState<string>("");
  const [precoHost, setPrecoHost] = useState<number>(0);
  const [contatoHost, setContatoHost] = useState<string>("");

  // Transport variables
  const [transportId, setTransportId] = useState<number>(0);
  const [tipoTransporteTransport, setTipoTransporteTransport] = useState<string>("");
  const [localIdaTransport, setLocalIdaTransport] = useState<string>("");
  const [localChegadaTransport, setLocalChegadaTransport] = useState<string>("");
  const [horaSaidaTransport, setHoraSaidaTransport] = useState<string>("");
  const [horaChegadaTransport, setHoraChegadaTransport] = useState<string>("");
  const [precoTransport, setPrecoTransport] = useState<number>(0);
  const [contatoTransport, setContatoTransport] = useState<string>("");

  // Modal variables
  const [travelNotifications, setTravelNotifications] = useState<TravelNotifications>({
    Thunderstorm: false,
    Drizzle: false,
    Rain: false,
    Snow: false,
    Atmosphere: false,
    Clouds: false,
    Clear: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [tryingDeleteTravel, setTryingDeleteTravel] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  // Travel fetch request
  const fetchTravel = useCallback(async () => {
    const response = await requestGetTravelWithInfo(params.id!);

    if (response instanceof ErrorResponse) {
      alert(response.message);
      return;
    }

    // Set travel variables
    setDataFim(response.data.endDate);
    setDataInicio(response.data.startDate);
    setLocal(response.data.local);
    setNumDePessoas(response.data.numParticipants.toString());
    setProposito(response.data.description);

    // Set host variables
    if (response.data.host) {
      const host = response.data.host;

      setHostId(host.id);
      setContatoHost(host.contact);
      setPrecoHost(host.price);
      setDataFimHost(host.endTime);
      setDataInicioHost(host.startTime);
      setLocalHost(host.local);
      setTipoEstadiaHost(host.type);
    } else {
      setContatoHost("");
      setPrecoHost(0);
      setDataFimHost("");
      setDataInicioHost("");
      setLocalHost("");
      setTipoEstadiaHost("");
    }

    // Set transport variables
    if (response.data.transport) {
      const transport = response.data.transport;

      setTransportId(transport.id);
      setContatoTransport(transport.contacts);
      setHoraChegadaTransport(transport.endTime);
      setHoraSaidaTransport(transport.startTime);
      setLocalChegadaTransport(transport.endLocal);
      setLocalIdaTransport(transport.startLocal);
      setPrecoTransport(transport.price);
      setTipoTransporteTransport(transport.type);
    } else {
      setContatoTransport("");
      setHoraChegadaTransport("");
      setHoraSaidaTransport("");
      setLocalChegadaTransport("");
      setLocalIdaTransport("");
      setPrecoTransport(0);
      setTipoTransporteTransport("");
    }

    // Set modal variables
    setTravelNotifications({
      Thunderstorm: response.data.Thunderstorm,
      Drizzle: response.data.Drizzle,
      Rain: response.data.Rain,
      Snow: response.data.Snow,
      Atmosphere: response.data.Atmosphere,
      Clouds: response.data.Clouds,
      Clear: response.data.Clear,
    });
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

    const dataInicioTimestamp = Date.parse(dataInicio);
    const dataFimTimestamp = Date.parse(dataFim);

    if (isNaN(dataInicioTimestamp) || isNaN(dataFimTimestamp)) {
      alert("Data inválida");
      return;
    }

    if (dataInicioTimestamp > dataFimTimestamp) {
      alert("Data de início não pode ser maior que a data de fim");
      return;
    }

    if (numDePessoas === "") {
      alert("Número de pessoas inválido");
      return;
    }

    const response = await requestEditTravel(parseInt(params.id!), {
      local,
      startDate: new Date(dataInicioTimestamp),
      endDate: new Date(dataFimTimestamp),
      description: proposito,
      numParticipants: parseInt(numDePessoas),
      ...travelNotifications,
    });

    if (response instanceof ErrorResponse) {
      alert("Erro ao editar viagem\n" + response.message);
      return;
    }

    alert("Viagem editada com sucesso");
    setWasEdited(!wasEdited);
    location.reload();
  }

  async function handleChangeSwitch(dataToUpdate: TravelNotifications) {
    setTravelNotifications(dataToUpdate);

    if (!dataInicio || !dataFim) {
      alert("Data inválida");
      return;
    }

    const dataInicioTimestamp = Date.parse(dataInicio);
    const dataFimTimestamp = Date.parse(dataFim);

    if (isNaN(dataInicioTimestamp) || isNaN(dataFimTimestamp)) {
      alert("Data inválida");
      return;
    }

    if (dataInicioTimestamp > dataFimTimestamp) {
      alert("Data de início não pode ser maior que a data de fim");
      return;
    }

    if (numDePessoas === "") {
      alert("Número de pessoas inválido");
      return;
    }

    setLoading(true);

    const response = await requestEditTravel(parseInt(params.id!), {
      local,
      startDate: new Date(dataInicioTimestamp),
      endDate: new Date(dataFimTimestamp),
      description: proposito,
      numParticipants: parseInt(numDePessoas),
      ...dataToUpdate,
    });

    if (response instanceof ErrorResponse) {
      alert("Erro ao editar viagem\n" + response.message);
      return;
    }

    setLoading(false);
  }

  const handleDeleteTravel = () => {
    setTryingDeleteTravel(!tryingDeleteTravel);
  };

  async function sendDeleteTravel() {
    const response = await requestDeleteTravel(parseInt(params.id!));

    if (response instanceof ErrorResponse) {
      alert("Erro ao deletar viagem\n" + response.message);
      return;
    }

    alert("Viagem deletada com sucesso");
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

  async function toggleModal() {
    setOpen(!open);
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
                maxLength={30}
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
                  value={moment(dataInicio).format("YYYY-MM-DD")}
                  onChange={(event) => setDataInicio(event.target.value)}
                />
              </div>
              <div className="column">
                <label htmlFor="local">Dia de fim:</label>
                <input
                  type="date"
                  placeholder="Data"
                  className={styles.inputDate}
                  required
                  value={moment(dataFim).format("YYYY-MM-DD")}
                  onChange={(event) => setDataFim(event.target.value)}
                />
              </div>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="proposito">Proposito:</label>
              <textarea
                placeholder="Proposito"
                name="proposito"
                rows={3}
                className={styles.textAreaBox}
                required
                maxLength={100}
                value={proposito}
                onChange={(event) => {
                  setProposito(event.target.value);
                }}
              />
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="numDePessoas">Número de Pessoas (Esperado):</label>
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
            <div className={styles.buttonContainer}>
              <button className={styles.submitButton} type="submit">
                SALVAR DADOS
              </button>

              <button className={styles.deleteButton} onClick={handleDeleteTravel} type="reset">
                <span>DELETAR VIAGEM</span>
              </button>
            </div>
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
                <span>{moment(dataInicioHost).format("DD/MM/YYYY")}</span>
              </div>
              Dia de saída:
              <div className={styles.cardInfo}>
                <span>{moment(dataFimHost).format("DD/MM/YYYY")}</span>
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
                  {moment(horaSaidaTransport).locale("pt-br").format("DD/MM/YYYY HH:mm")} até{" "}
                  {moment(horaChegadaTransport).locale("pt-br").format("DD/MM/YYYY HH:mm")}
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
        {tryingDeleteTravel ? (
          <div className={styles.confirmBox}>
            <button className={styles.exitDeleteButton} onClick={handleDeleteTravel}>
              X
            </button>
            <div className={styles.confirmInfoBox}>
              Você tem certeza que deseja excluir esta viagem?
            </div>
            <button className={styles.confirmDeleteButton} onClick={sendDeleteTravel}>
              Excluir
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* TODO: Arrumar uma solução melhor */}
      <Link to={`/schedule/${params.id}`} id={styles.schedule_link}>
        <IconButton id={styles.schedule_link}>
          <CalendarIcon fontSize="large" />
        </IconButton>
      </Link>
      {searchParams.get("guest") != "true" && (
        <Link to={`/participants-list/${params.id}`} id={styles.participants_link}>
          <IconButton id={styles.participants_link}>
            <GroupsIcon fontSize="large" />
          </IconButton>
        </Link>
      )}
      <div id={styles.forecast_button}>
        <button className={styles.normalbutton} onClick={toggleModal}>
          Personalizar notificações
        </button>
      </div>
      <Dialog open={open} onClose={toggleModal} fullWidth>
        <DialogTitle>Adicionar Participante</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Para limitar as notificações de clima que irá receber, selecione alguma opção abaixo.
          </DialogContentText>
          {loading ? (
            <div className={styles.loading_container}>
              <CircularProgress />
              <p>Modificando configuração das notificações...</p>
            </div>
          ) : (
            <div id={styles.switch_container}>
              <div>
                <p>Tempestade</p>
                <Switch
                  checked={travelNotifications.Thunderstorm}
                  onChange={() => {
                    handleChangeSwitch({
                      ...travelNotifications,
                      Thunderstorm: !travelNotifications.Thunderstorm,
                    });
                  }}
                />
              </div>
              <div>
                <p>Garoa</p>
                <Switch
                  checked={travelNotifications.Drizzle}
                  onChange={() => {
                    handleChangeSwitch({
                      ...travelNotifications,
                      Drizzle: !travelNotifications.Drizzle,
                    });
                  }}
                />
              </div>
              <div>
                <p>Chuva</p>
                <Switch
                  checked={travelNotifications.Rain}
                  onChange={() => {
                    handleChangeSwitch({
                      ...travelNotifications,
                      Rain: !travelNotifications.Rain,
                    });
                  }}
                />
              </div>
              <div>
                <p>Neve</p>
                <Switch
                  checked={travelNotifications.Snow}
                  onChange={() => {
                    handleChangeSwitch({
                      ...travelNotifications,
                      Snow: !travelNotifications.Snow,
                    });
                  }}
                />
              </div>
              <div>
                <p>Atmosfera</p>
                <Switch
                  checked={travelNotifications.Atmosphere}
                  onChange={() => {
                    handleChangeSwitch({
                      ...travelNotifications,
                      Atmosphere: !travelNotifications.Atmosphere,
                    });
                  }}
                />
              </div>
              <div>
                <p>Nublado</p>
                <Switch
                  checked={travelNotifications.Clouds}
                  onChange={() => {
                    handleChangeSwitch({
                      ...travelNotifications,
                      Clouds: !travelNotifications.Clouds,
                    });
                  }}
                />
              </div>
              <div>
                <p>Céu Limpo</p>
                <Switch
                  checked={travelNotifications.Clear}
                  onChange={() => {
                    handleChangeSwitch({
                      ...travelNotifications,
                      Clear: !travelNotifications.Clear,
                    });
                  }}
                />
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <button className={styles.normalbutton} type="reset" onClick={toggleModal}>
            Fechar
          </button>
        </DialogActions>
      </Dialog>
    </Navbar>
  );
}
