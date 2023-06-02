import { Link, Outlet } from "react-router-dom";
import styles from "./styles.module.scss";

export default function Navbar() {
  return (
    <>
      <nav id={styles.navbar}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
