import CardTravelIcon from "@mui/icons-material/CardTravel";
import { IconButton } from "@mui/material";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorResponse } from "../../api/api-instance";
import {
  requestCreateHost,
  requestEditHost,
  requestGetHost,
} from "../../api/requests/travels-requests";
import styles from "./styles.module.scss";

interface StayFormsProps {
  isEditing: boolean;
  id?: string;
}

const StayForms: React.FC<StayFormsProps> = ({ isEditing, id }) => {
  const [local, setLocal] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");
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

    const response = await requestGetHost(id);

    if (response instanceof ErrorResponse) {
      alert(response.message);
      return;
    }

    setContato(response.data.contact);
    setPreco(response.data.price);
    setDataFim(response.data.endTime);
    setDataInicio(response.data.startTime);
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

    if (id === undefined) {
      throw "id is not present";
    }

    if (isEditing === true) {
      const response = await requestEditHost(
        {
          contact: contato,
          endTime: new Date(dataFimTimestamp),
          local,
          price: preco,
          startTime: new Date(dataInicioTimestamp),
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
        endTime: new Date(dataFimTimestamp),
        local,
        price: preco,
        startTime: new Date(dataInicioTimestamp),
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

  const returnToTravelInfo = () => {
    navigate(-1);
  };

  return (
    <>
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
              value={moment(dataInicio).format("YYYY-MM-DD")}
              onChange={(event) => setDataInicio(event.target.value)}
            />
          </div>
          <div className="column">
            <label htmlFor="data">Dia de saída:</label>
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

export default StayForms;
