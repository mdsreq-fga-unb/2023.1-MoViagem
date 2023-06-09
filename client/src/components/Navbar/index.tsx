import AccountIcon from "@mui/icons-material/AccountCircle";
import CancelIcon from "@mui/icons-material/CancelOutlined";
import PlaneIcon from "@mui/icons-material/Flight";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LogoMoViagem from "../../assets/LogoMoViagem.png";
import { AuthContext } from "../../auth/context/auth-provider";
import styles from "./styles.module.scss";

const NavbarPages = {
  TRAVELS: PlaneIcon,
};
export interface NavbarProps {
  pageName: string;
  selectedPage?: "TRAVELS" | "GROUPS" | "CALENDAR";
}

export default function Navbar({
  children,
  pageName,
  selectedPage,
}: React.PropsWithChildren<NavbarProps>) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    if (auth === undefined || auth.userInfo === null) {
      return;
    }

    auth.eraseTokens();
    navigate("/login-and-register");
  }

  const navigateToUserInfo = () => {
    navigate("/user-info");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToTravels = () => {
    navigate("/travels");
  };

  function navigateToPage(page: "TRAVELS" | "GROUPS" | "CALENDAR") {
    switch (page) {
      case "TRAVELS":
        navigateToTravels();
        break;
    }
  }

  return (
    <div id={styles.container}>
      <div id={styles.topBar}>
        <h1>{pageName}</h1>
        {auth?.userInfo && (
          <div id={styles.topBarMenu} onClick={navigateToUserInfo}>
            <AccountIcon fontSize="large" />
            <p>{auth.userInfo.name}</p>
          </div>
        )}
      </div>

      <div id={styles.sideBar}>
        <div id={styles.sideBarIcon} onClick={navigateToHome}>
          <img alt="MoViagem" src={LogoMoViagem}></img>
        </div>
        <div id={styles.sideBarLinksContainer}>
          {Object.entries(NavbarPages).map(([page, Icon]) => (
            <div
              key={page}
              className={
                page === selectedPage
                  ? styles.sideBarLinkContainerActive
                  : styles.sideBarLinkContainer
              }
            >
              <IconButton
                onClick={() => {
                  navigateToPage(page as "TRAVELS" | "GROUPS" | "CALENDAR");
                }}
              >
                <Icon
                  className={
                    page === selectedPage ? styles.sideBarLinksActive : styles.sideBarLinks
                  }
                  fontSize="large"
                />
              </IconButton>
            </div>
          ))}
        </div>
        <div className={styles.sideBarLinkContainer}>
          <IconButton onClick={handleLogout}>
            <CancelIcon id={styles.cancelIcon} fontSize="large" />
          </IconButton>
        </div>
      </div>
      <div id={styles.mainContent}>{children}</div>
    </div>
  );
}
