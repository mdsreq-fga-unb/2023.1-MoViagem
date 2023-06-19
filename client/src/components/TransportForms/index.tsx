import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorResponse } from "../../api/api-instance";
import {
  editTransport,
  getTrasnsport,
  requestCreateTransport,
} from "../../api/requests/travels-requests";
import styles from "./styles.module.scss";

interface TransportFormsProps {
  whichAction: boolean;
  id?: string;
}

const TransportForms: React.FC<TransportFormsProps> = ({ whichAction, id }) => {
  const [tipoTransporte, setTipoTransporte] = useState<string>("");
  const [localIda, setLocalIda] = useState<string>("");
  const [localChegada, setLocalChegada] = useState<string>("");
  const [horaSaida, setHoraSaida] = useState<string>("");
  const [horaChegada, setHoraChegada] = useState<string>("");
  const [preco, setPreco] = useState<number>(0);
  const [contato, setContato] = useState<string>("");

  const navigate = useNavigate();

  const fetchTransport = async () => {
    if (whichAction === true) {
      if (id === undefined) {
        throw "Necessario o id";
      }
      const response = await getTrasnsport(id);
      if (response instanceof ErrorResponse) {
        console.log(response.message);
        return;
      }
      setContato(response.data.contacts);
      setHoraChegada(response.data.startTime);
      setHoraSaida(response.data.endTime);
      setLocalChegada(response.data.endLocal);
      setLocalIda(response.data.startLocal);
      setPreco(response.data.price);
      setTipoTransporte(response.data.type);
    }
  };
  useEffect(() => {
    fetchTransport();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!horaSaida || !horaChegada) {
      alert("horarios invalidos");
      return;
    }

    if (id === undefined) {
      return "id null";
    }

    if (whichAction === true) {
      const response = editTransport(
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
      console.log(response);

      if (response instanceof ErrorResponse) {
        alert("Erro ao tentar editar o Transporte\n" + response.message);
        return;
      }

      alert("Transporte editado com sucesso");
      navigate(`/travel-info/${id}`, { replace: true });
    } else {
      if (id === undefined) {
        return "id null";
      }
      const transportCreated = await requestCreateTransport(parseInt(id), {
        contacts: contato,
        endLocal: localChegada,
        startLocal: localIda,
        endTime: horaSaida,
        startTime: horaChegada,
        price: preco,
        type: tipoTransporte,
      });
      console.log("transport criado", transportCreated);

      if (transportCreated instanceof ErrorResponse) {
        alert("Erro ao criar transporte\n" + transportCreated.message);
        return;
      }
      alert("Transporte salvo com sucesso");
      navigate(`/travel-info/${id}`, { replace: true });
      
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
            type="text"
            placeholder="Ex: 08:00"
            className={styles.inputContato}
            required
            value={horaSaida}
            onChange={(event) => {
              setHoraSaida(event.target.value);
            }}
          />
        </div>
        <div className="column">
          <label htmlFor="text">Horário de chegada:</label>
          <input
            type="text"
            placeholder="Ex: 16:30"
            className={styles.inputContato}
            required
            value={horaChegada}
            onChange={(event) => {
              setHoraChegada(event.target.value);
            }}
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
