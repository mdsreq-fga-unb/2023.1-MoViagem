import { useEffect } from "react";
import styles from "./styles.module.scss";

export default function Home() {
  useEffect(() => {
    console.log("Home");
  }, []);

  return (
    <h1 id={styles.title}>
      <a href="https://www.google.com">Home</a>
    </h1>
  );
}
