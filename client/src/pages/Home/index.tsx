import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Home");
  }, []);

  function handleHome() {
    navigate("/login", { replace: true });
  }

  return (
    <h1 id={styles.title}>
      <p onClick={handleHome}>Home</p>
    </h1>
  );
}
