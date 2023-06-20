import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorResponse } from "../../api/api-instance";
import { editHost, getHost, requestCreateHost } from "../../api/requests/travels-requests";
import {
  convertDateInputValueToDate,
  convertDateToDateInputValue,
} from "../../utils/date-utilities";
import styles from "./styles.module.scss";

interface StayFormsProps {
  isEditing: boolean;
  id?: string;
}

const StayForms: React.FC<StayFormsProps> = ({ isEditing, id }) => {
  const [local, setLocal] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);
  const [tipoEstadia, setTipoEstadia] = useState<string>("");
  const [preco, setPreco] = useState<number>(0);
  const [contato, setContato] = useState<string>("");

  const navigate = useNavigate();

  const fetchHost = useCallback(async () => {
    if (isEditing === false) {
      return;
    }

    if (id === undefined) {
      throw "Necessário o id";
    }

    const response = await getHost(id);

    if (response instanceof ErrorResponse) {
      alert(response.message);
      return;
    }

    setContato(response.data.contact);
    setPreco(response.data.price);
    setDataFim(new Date(response.data.endTime));
    setDataInicio(new Date(response.data.startTime));
    setLocal(response.data.local);
    setTipoEstadia(response.data.type);
  }, [id, isEditing]);

  useEffect(() => {
    fetchHost();
  }, [fetchHost]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!dataInicio || !dataFim) {
      alert("Data inválida");
      return;
    }

    if (id === undefined) {
      throw "id is not present";
    }

    if (isEditing === true) {
      const response = await editHost(
        {
          contact: contato,
          endTime: dataFim,
          local: local,
          price: preco,
          startTime: dataInicio,
          type: tipoEstadia,
        },
        parseInt(id)
      );

      if (response instanceof ErrorResponse) {
        alert("Erro ao tentar editar a estadia\n" + response.message);
        return;
      }

      alert("Estadia editada com sucesso");
      navigate(`/travel-info/${id}`);
    } else {
      const createdHost = await requestCreateHost(parseInt(id), {
        contact: contato,
        endTime: dataFim,
        local: local,
        price: preco,
        startTime: dataInicio,
        type: tipoEstadia,
      });

      if (createdHost instanceof ErrorResponse) {
        alert("Erro ao tentar criar a estadia\n" + createdHost.message);
        return;
      }

      alert("Estadia criada com sucesso");
      navigate(`/travel-info/${id}`);
    }
  }

  return (
    <form className={styles.insideBox} onSubmit={handleSubmit}>
      <h2>Dados da Estadia:</h2>
      <div className={styles.inputContainer}>
        <label htmlFor="tipo">Tipo de estadia:</label>
        <input
          type="text"
          name="tipo"
          placeholder="Digite aqui o tipo da estadia (hotel, casa, ...)"
          className={styles.inputBox}
          required
          value={tipoEstadia}
          onChange={(event) => {
            setTipoEstadia(event.target.value);
          }}
        />
      </div>
      <div className={styles.inputGroup}>
        <div className="column">
          <label htmlFor="data">Dia de chegada:</label>
          <input
            type="date"
            placeholder="Data"
            className={styles.inputDate}
            required
            value={convertDateToDateInputValue(dataInicio)}
            onChange={(event) => setDataInicio(convertDateInputValueToDate(event.target.value))}
          />
        </div>
        <div className="column">
          <label htmlFor="data">Dia de saída:</label>
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

export default StayForms;
