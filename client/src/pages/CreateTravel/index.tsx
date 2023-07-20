import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorResponse } from "../../api/api-instance";
import { requestCreateTravel } from "../../api/requests/travels-requests";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";

export default function CreateTravel() {
  const [local, setLocal] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");
  const [proposito, setProposito] = useState<string>("");
  const [numDePessoas, setNumDePessoas] = useState("");

  const navigate = useNavigate();

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

    const response = await requestCreateTravel({
      local,
      startDate: new Date(dataInicioTimestamp),
      endDate: new Date(dataFimTimestamp),
      description: proposito,
      numParticipants: parseInt(numDePessoas),
    });

    if (response instanceof ErrorResponse) {
      alert("Erro ao editar viagem\n" + response.message);
      return;
    }

    alert("Viagem criada com sucesso");
    navigate("/travels");
  }

  return (
    <Navbar pageName="Criar Viagem">
      <div className={styles.pageContainer}>
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
                value={dataInicio}
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
                value={dataFim}
                onChange={(event) => setDataFim(event.target.value)}
              />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="proposito">Proposito:</label>
            <textarea
              placeholder="Ex: Ir visitar ..."
              name="proposito"
              rows={3}
              className={styles.textAreaBox}
              maxLength={100}
              required
              value={proposito}
              onChange={(event) => {
                setProposito(event.target.value);
              }}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="numDePessoas">Número de Pessoas Esperado:</label>
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
            SALVAR
          </button>
        </form>
      </div>
    </Navbar>
  );
}
