import AccountIcon from "@mui/icons-material/AccountCircle";
import CancelIcon from "@mui/icons-material/CancelOutlined";
import PlaneIcon from "@mui/icons-material/Flight";
import NotificationIcon from "@mui/icons-material/Notifications";
import { Badge, IconButton, Menu } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorResponse } from "../../api/api-instance";
import { WeatherForecastResponseDTO } from "../../api/dto/notification.dto";
import { requestGetNotifications } from "../../api/requests/notification-requests";
import LogoMoViagem from "../../assets/LogoMoViagem.png";
import { AuthContext } from "../../auth/context/auth-provider";
import Notification from "./Notification";
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

  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const menuOpen = anchorElement !== null;

  const [notifications, setNotifications] = useState<WeatherForecastResponseDTO[]>([]);

  useEffect(() => {
    if (auth?.userInfo) {
      async function getNotifications() {
        const response = await requestGetNotifications();

        if (response instanceof ErrorResponse) {
          alert(response.message);
          return;
        }

        setNotifications(response.data);
      }

      getNotifications();
      const interval = setInterval(getNotifications, 60000);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  function handleMenuOpen(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorElement(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorElement(null);
  }

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
          <div id={styles.topBarMenu}>
            <Badge badgeContent={notifications.length} color="error" onClick={handleMenuOpen}>
              <NotificationIcon fontSize="large" />
            </Badge>
            <Menu
              anchorEl={anchorElement}
              open={menuOpen}
              onClose={handleMenuClose}
              slotProps={{
                paper: {
                  style: {
                    minHeight: "50vh",
                    maxHeight: "80vh",
                    width: "20vw",
                  },
                },
              }}
            >
              <div className={styles.notificationMenu}>
                {notifications.map((notification) => (
                  <Notification data={notification} />
                ))}
              </div>
            </Menu>
            <span onClick={navigateToUserInfo}>
              <AccountIcon fontSize="large" />
              <p>{auth.userInfo.name}</p>
            </span>
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
