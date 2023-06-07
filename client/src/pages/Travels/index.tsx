import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";

export default function Home() {
  return (
    <Navbar pageName="Viagens" selectedPage="TRAVELS">
      <h1 id={styles.title}>
        <p>Home</p>
      </h1>
    </Navbar>
  );
}
