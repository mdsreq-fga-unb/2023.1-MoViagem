import { useState } from "react";
import styles from "./styles.module.scss";
import { requestCreateStay, requestEditStay } from "../../api/requests/travels-requests";
import { ErrorResponse } from "../../api/api-instance";
import { useNavigate } from "react-router-dom";

interface StayFormsProps {
  whichAction: boolean;
}

const StayForms: React.FC<StayFormsProps> = ({ whichAction }) => {

  const [local, setLocal] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);
  const [tipoEstadia, setTipoEstadia] = useState<string>("");
  const [preco, setPreco] = useState<number>(0);
  const [contato, setContato] = useState<string>("");

  const navigate = useNavigate()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!dataInicio || !dataFim) {
      alert("Data inválida");
      return;
    }

    /* Create is false */
    if (!whichAction) {
      // const response = await requestCreateStay({
      //   stayType: tipoEstadia,
      //   startDate: dataInicio,
      //   endDate: dataFim,
      //   local: local,
      //   price: preco,
      //   contact: contato,
      // })

      // if (response instanceof ErrorResponse) {
      //   alert("Erro ao criar estadia\n" + response.message);
      //   return;
      // }

    /* Edit is true */
    } else {
      // const response = await requestEditStay({
      //   stayType: tipoEstadia,
      //   startDate: dataInicio,
      //   endDate: dataFim,
      //   local: local,
      //   price: preco,
      //   contact: contato,
      // })

      // if (response instanceof ErrorResponse) {
      //   alert("Erro ao editar estadia\n" + response.message);
      //   return;
      // }
    }

    navigate("/edit-travel", { replace: true })
    alert("Estadia salva com sucesso");
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
          <label htmlFor="data">Dia de saída:</label>
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
}

export default StayForms;