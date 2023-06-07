import { useEffect, useState } from "react";
import { ErrorResponse } from "../../api/api-instance";
import { getHello } from "../../api/requests/travels-requests";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";

export default function Home() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    async function init() {
      const response = await getHello();

      if (response instanceof ErrorResponse) {
        alert(response.message);
        return;
      }

      setMessage(response.data);
    }
    init();
  }, []);

  return (
    <Navbar pageName="Viagens" selectedPage="TRAVELS">
      <h1 id={styles.title}>
        <p>{message}</p>
      </h1>
    </Navbar>
  );
}
