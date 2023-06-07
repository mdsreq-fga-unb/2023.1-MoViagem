import AccountIcon from "@mui/icons-material/AccountCircle";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import CancelIcon from "@mui/icons-material/CancelOutlined";
import FamilyIcon from "@mui/icons-material/FamilyRestroom";
import PlaneIcon from "@mui/icons-material/Flight";
import ListIcon from "@mui/icons-material/ViewList";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/auth-provider";
import styles from "./styles.module.scss";

const NavbarPages = {
  TRAVELS: PlaneIcon,
  GROUPS: FamilyIcon,
  CALENDAR: CalendarIcon,
  TASKS: ListIcon,
};

export interface NavbarProps {
  pageName: string;
  selectedPage?: "TRAVELS" | "GROUPS" | "CALENDAR" | "TASKS";
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
    navigate("/login-and-register", { replace: true });
  }

  return (
    <div id={styles.container}>
      <div id={styles.topBar}>
        <h1>{pageName}</h1>
        {auth?.userInfo && (
          <div id={styles.topBarMenu}>
            <AccountIcon fontSize="large" />
            <p>{auth.userInfo.name}</p>
          </div>
        )}
      </div>

      <div id={styles.sideBar}>
        <div id={styles.sideBarIcon}></div>
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
              <IconButton>
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
