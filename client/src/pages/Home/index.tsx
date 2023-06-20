import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Link } from "react-router-dom";
import HomeImage from "../../assets/HomeImage.png";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.scss";

export default function Home() {
  return (
    <Navbar pageName="">
      <div id={styles.outsideBox}>
        <div id={styles.insideBox}>
          <h1 id={styles.title}>MóViagem</h1>
          <h2 id={styles.subtitle}>Todas as suas viagens em um só lugar</h2>
          <p id={styles.description}>
            Nosso site de gerenciamento de viagens oferece uma solução abrangente para planejar e
            organizar suas viagens. Você pode criar viagens, armazenar informações sobre destinos,
            estadias e transporte, além de adicionar um cronograma personalizado com atividades
            diárias. Convide outros usuários para participarem das suas viagens e receba informações
            atualizadas sobre o clima do seu destino. Tenha uma experiência de viagem organizada,
            conveniente e emocionante em um só lugar.
          </p>
          <Link to="/create-travel" style={{ textDecoration: "none" }}>
            <button id={styles.createTravelButton}>
              <MenuBookIcon fontSize="large" />
              <div id={styles.buttonText}>Criar Viagem</div>
            </button>
          </Link>
        </div>
        <div id={styles.imageBox}>
          <img alt="MóViagem logo" src={HomeImage}></img>
        </div>
      </div>
    </Navbar>
  );
}
