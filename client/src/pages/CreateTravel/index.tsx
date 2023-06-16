import { useState } from "react";
import { ErrorResponse } from "../../api/api-instance";
import { requestCreateTravel } from "../../api/requests/travels-requests";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";

export default function CreateTravel() {
  const [local, setLocal] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);
  const [proposito, setProposito] = useState<string>("");
  const [numDePessoas, setNumDePessoas] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!dataInicio || !dataFim) {
      alert("Data inválida");
      return;
    }

    const response = await requestCreateTravel({
      local: local,
      startDate: dataInicio,
      endDate: dataFim,
      description: proposito,
      numParticipants: parseInt(numDePessoas),
    });

    if (response instanceof ErrorResponse) {
      alert("Erro ao criar viagem\n" + response.message);
      return;
    }

    // TODO: Redirecionar para a página de lista de viagens
    alert("Viagem criada com sucesso");
  }

  return (
    <Navbar pageName="Criar Viagem">
      <div className={styles.pageContainer}>
        <div className={styles.boxContainer}>
          <div className={styles.outsideBox}>
            {/* <h1>Teste</h1> */}
            <form className={styles.insideBox} onSubmit={handleSubmit}>
              <div>
                <label htmlFor="local">Local:</label>
                <input
                  type="text"
                  name="local"
                  placeholder="Local"
                  className={styles.inputBox}
                  required
                  value={local}
                  onChange={(event) => {
                    setLocal(event.target.value);
                  }}
                />
              </div>
              <div className={styles.inputGroup}>
                <div className="">
                  <label htmlFor="local">Dia de início:</label>
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
                <div className="">
                  <label htmlFor="local">Dia de fim:</label>

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

              <div>
                <label htmlFor="proposito">Proposito:</label>
                <textarea
                  placeholder="Proposito da viagem"
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

              <div>
                <label htmlFor="numDePessoas">Numero de Pessoas:</label>
                <input
                  type="Number"
                  name="numDePessoas"
                  placeholder="Número de pessoas na viagem"
                  className={styles.inputNum}
                  required
                  value={numDePessoas}
                  onChange={(event) => {
                    setNumDePessoas(event.target.value);
                  }}
                />
              </div>

              <button className={styles.submitButton} type="submit">
                CRIAR
              </button>
            </form>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
