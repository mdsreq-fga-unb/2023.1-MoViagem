import { useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";

export default function CreateTravel() {
  const [local, setLocal] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);
  const [proposito, setProposito] = useState<string>("");
  const [numDePessoas, setNumDePessoas] = useState("");

  return (
    <Navbar pageName="Criar Viagem">
      <div className={styles.pageContainer}>
        <div className={styles.boxContainer}>
          <div className={styles.outsideBox}>
            {/* <h1>Teste</h1> */}
            <form
              className={styles.insideBox}
              onSubmit={() => {
                console.log("Submit do form");
              }}
            >
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
              <div className={styles.inputGroup}>
                <div className="inputDataIni">
                  <label htmlFor="email"></label>
                  <input
                    type="date"
                    placeholder="Data"
                    className={styles.inputBox}
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
                <div className="inputDataFim">
                  <input
                    type="date"
                    placeholder="Data"
                    className={styles.inputBox}
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

              <textarea
                placeholder="Proposito da viagem"
                rows={3}
                className={styles.textAreaBox}
                required
                value={proposito}
                onChange={(event) => {
                  setProposito(event.target.value);
                }}
              />
              <input
                type="Number"
                placeholder="Número de pessoas na viagem"
                className={styles.inputBox}
                required
                value={numDePessoas}
                onChange={(event) => {
                  setNumDePessoas(event.target.value);
                }}
              />
              <button className={styles.submitButton}> CRIAR</button>
            </form>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
