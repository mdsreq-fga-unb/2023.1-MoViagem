import CardTravelIcon from "@mui/icons-material/CardTravel";
import { IconButton } from "@mui/material";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorResponse } from "../../api/api-instance";
import {
  requestCreateTransport,
  requestEditTransport,
  requestGetTransport,
} from "../../api/requests/travels-requests";
import styles from "./styles.module.scss";

interface TransportFormsProps {
  isEditing: boolean;
  id?: string;
}

const TransportForms: React.FC<TransportFormsProps> = ({ isEditing, id }) => {
  const [tipoTransporte, setTipoTransporte] = useState<string>("");
  const [localIda, setLocalIda] = useState<string>("");
  const [localChegada, setLocalChegada] = useState<string>("");
  const [horaChegada, setHoraChegada] = useState<string>("");
  const [horaSaida, setHoraSaida] = useState<string>("");
  const [preco, setPreco] = useState<number>(0);
  const [contato, setContato] = useState<string>("");

  const navigate = useNavigate();

  const fetchTransport = useCallback(async () => {
    if (isEditing === false) {
      return;
    }

    if (id === undefined) {
      throw "Necessário o id";
    }

    const response = await requestGetTransport(id);

    if (response instanceof ErrorResponse) {
      alert(response.message);
      return;
    }

    setContato(response.data.contacts);
    setHoraChegada(response.data.endTime);
    setHoraSaida(response.data.startTime);
    setLocalChegada(response.data.endLocal);
    setLocalIda(response.data.startLocal);
    setPreco(response.data.price);
    setTipoTransporte(response.data.type);
  }, [id, isEditing]);

  useEffect(() => {
    fetchTransport();
  }, [fetchTransport]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!horaSaida || !horaChegada) {
      alert("horarios invalidos");
      return;
    }

    const horaSaidaTimestamp = Date.parse(horaSaida);
    const horaChegadaTimestamp = Date.parse(horaChegada);

    if (isNaN(horaSaidaTimestamp) || isNaN(horaChegadaTimestamp)) {
      alert("horarios invalidos");
      return;
    }

    if (horaSaidaTimestamp > horaChegadaTimestamp) {
      alert("horario de saida nao pode ser maior que o de chegada");
      return;
    }

    if (id === undefined) {
      throw "id is not present";
    }

    if (isEditing === true) {
      const response = requestEditTransport(
        {
          contacts: contato,
          endLocal: localChegada,
          endTime: new Date(horaChegadaTimestamp),
          price: preco,
          startLocal: localIda,
          startTime: new Date(horaSaidaTimestamp),
          type: tipoTransporte,
        },
        parseInt(id)
      );

      if (response instanceof ErrorResponse) {
        alert("Erro ao tentar editar o Transporte\n" + response.message);
        return;
      }

      alert("Transporte editado com sucesso");
      navigate(`/travel-info/${id}`);
    } else {
      const transportCreated = await requestCreateTransport(parseInt(id), {
        contacts: contato,
        endLocal: localChegada,
        startLocal: localIda,
        endTime: new Date(horaChegadaTimestamp),
        startTime: new Date(horaSaidaTimestamp),
        price: preco,
        type: tipoTransporte,
      });

      if (transportCreated instanceof ErrorResponse) {
        alert("Erro ao criar transporte\n" + transportCreated.message);
        return;
      }

      alert("Transporte salvo com sucesso");
      navigate(`/travel-info/${id}`);
    }
  }

  const returnToTravelInfo = () => {
    navigate(-1);
  };

  return (
    <>
      <form className={styles.insideBox} onSubmit={handleSubmit}>
        <h2>Dados do Transporte:</h2>
        <div className={styles.inputContainer}>
          <label htmlFor="tipo">Tipo de transporte:</label>
          <input
            type="text"
            name="tipo"
            placeholder="Digite aqui o tipo da transporte (avião, ônibus, ...)"
            className={styles.inputBox}
            required
            value={tipoTransporte}
            onChange={(event) => {
              setTipoTransporte(event.target.value);
            }}
          />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.column}>
            <label htmlFor="text">Local de saída:</label>
            <input
              type="text"
              placeholder="Local de saída"
              className={styles.inputText}
              required
              value={localIda}
              onChange={(event) => {
                setLocalIda(event.target.value);
              }}
            />
          </div>
          <div className={styles.column}>
            <label htmlFor="data" className={styles.labelStyle}>
              Horário de saída:
            </label>
            <input
              type="datetime-local"
              className={styles.inputDate}
              required
              value={moment(horaSaida).format("YYYY-MM-DDTHH:mm")}
              onChange={(event) => setHoraSaida(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.column}>
            <label htmlFor="text">Local de chegada:</label>
            <input
              type="text"
              placeholder="Local de chegada"
              className={styles.inputText}
              required
              value={localChegada}
              onChange={(event) => {
                setLocalChegada(event.target.value);
              }}
            />
          </div>
          <div className={styles.column}>
            <label htmlFor="data" className={styles.labelStyle}>
              Horário de chegada:
            </label>
            <input
              type="datetime-local"
              className={styles.inputDate}
              required
              value={moment(horaChegada).format("YYYY-MM-DDTHH:mm")}
              onChange={(event) => setHoraChegada(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.column}>
            <label htmlFor="preco">Preço:</label>
            <input
              type="Number"
              name="preco"
              placeholder="R$"
              className={styles.inputNum}
              required
              value={preco}
              onChange={(event) => {
                setPreco(event.target.valueAsNumber);
              }}
            />
          </div>
          <div className={styles.column}>
            <label htmlFor="contato">Contato:</label>
            <input
              type="text"
              name="contato"
              placeholder="Celular, e-mail, ..."
              className={styles.inputContato}
              required
              value={contato}
              onChange={(event) => {
                setContato(event.target.value);
              }}
            />
          </div>
        </div>

        <button className={styles.submitButton} type="submit">
          SALVAR
        </button>
      </form>
      <div onClick={returnToTravelInfo} id={styles.schedule_link}>
        <IconButton id={styles.schedule_link}>
          <CardTravelIcon fontSize="large" />
        </IconButton>
      </div>
    </>
  );
};

export default TransportForms;
