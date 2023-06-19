import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorResponse } from "../../api/api-instance";
import { requestCreateTransport } from "../../api/requests/travels-requests";
import styles from "./styles.module.scss";

interface TransportFormsProps {
  whichAction: boolean;
}

const TransportForms: React.FC<TransportFormsProps> = ({ whichAction }) => {
  const params = useParams()
  const [tipoTransporte, setTipoTransporte] = useState<string>("");
  const [localIda, setLocalIda] = useState<string>("");
  const [localChegada, setLocalChegada] = useState<string>("");
  const [horaSaida, setHoraSaida] = useState<string>("");
  const [horaChegada, setHoraChegada] = useState<string>("");
  const [preco, setPreco] = useState<number>(0);
  const [contato, setContato] = useState<string>("");

  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    

    if (!horaSaida || !horaChegada) {
      alert("horarios invalidos");
      return;
    }

    const response = await requestCreateTransport({
      contacts: contato,
      endLocal: localChegada,
      startLocal: localIda,
      endTime: horaSaida,
      startTime: horaChegada,
      price: preco,
      type: tipoTransporte,
    });
    console.log(response)

    if (response instanceof ErrorResponse) {
      alert("Erro ao criar transporte\n" + response.message);
      return;
    }

    navigate("/travel-info/1", { replace: true });
    alert("Transporte salvo com sucesso");
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
