import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorResponse } from "../../api/api-instance";
import {
  requestCreateTransport,
  requestEditTransport,
  requestGetTransport,
} from "../../api/requests/travels-requests";
import {
  convertDateInputValueToDate,
  convertDateToDateTimeInputValue,
} from "../../utils/date-utilities";
import styles from "./styles.module.scss";

interface TransportFormsProps {
  isEditing: boolean;
  id?: string;
}

const TransportForms: React.FC<TransportFormsProps> = ({ isEditing, id }) => {
  const [tipoTransporte, setTipoTransporte] = useState<string>("");
  const [localIda, setLocalIda] = useState<string>("");
  const [localChegada, setLocalChegada] = useState<string>("");
  const [horaChegada, setHoraChegada] = useState<Date | null>(null);
  const [horaSaida, setHoraSaida] = useState<Date | null>(null);
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
    setHoraChegada(new Date(response.data.endTime));
    setHoraSaida(new Date(response.data.startTime));
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

    if (id === undefined) {
      throw "id is not present";
    }

    if (isEditing === true) {
      const response = requestEditTransport(
        {
          contacts: contato,
          endLocal: localChegada,
          endTime: horaChegada,
          price: preco,
          startLocal: localIda,
          startTime: horaSaida,
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
        endTime: horaChegada,
        startTime: horaSaida,
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

  return (
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
        <div className="column">
          <label htmlFor="text">Local de saída:</label>
          <input
            type="text"
            placeholder="Local de saída"
            className={styles.inputContato}
            required
            value={localIda}
            onChange={(event) => {
              setLocalIda(event.target.value);
            }}
          />
        </div>
        <div className="column">
          <label htmlFor="text">Local de chegada:</label>
          <input
            type="text"
            placeholder="Local de chegada"
            className={styles.inputContato}
            required
            value={localChegada}
            onChange={(event) => {
              setLocalChegada(event.target.value);
            }}
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <div className="column">
          <label htmlFor="text">Horário de saída:</label>
          <input
            type="datetime-local"
            className={styles.inputContato}
            required
            value={convertDateToDateTimeInputValue(horaSaida)}
            onChange={(event) => setHoraSaida(convertDateInputValueToDate(event.target.value))}
          />
        </div>
        <div className="column">
          <label htmlFor="text">Horário de chegada:</label>
          <input
            type="datetime-local"
            className={styles.inputContato}
            required
            value={convertDateToDateTimeInputValue(horaChegada)}
            onChange={(event) => setHoraChegada(convertDateInputValueToDate(event.target.value))}
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.inputContainer}>
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
        <div className={styles.inputContainer}>
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
  );
};

export default TransportForms;
