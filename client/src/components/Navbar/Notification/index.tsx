import { WeatherForecastResponseDTO } from "../../../api/dto/notification.dto";
import styles from "./styles.module.scss";

interface NotificationProps {
  data: WeatherForecastResponseDTO;
}

export default function Notification({ data }: NotificationProps) {
  return (
    <div className={styles.notificationBox}>
      <div className={styles.infoBox}>
        <p className={styles.notificationTitle}>{data.local}</p>
        <div>
          <p className={styles.notificationText}>MAX: {data.maxTemp}°C</p>
          <p className={styles.notificationText}>MIN: {data.minTemp}°C</p>
        </div>
        <p className={styles.notificationDate}>{new Date(data.date).toLocaleDateString()}</p>
      </div>

      <div className={styles.infoBox}>
        <img
          src={`https://openweathermap.org/img/wn/${data.weatherIcon}.png`}
          alt="icon"
          className={styles.notificationImage}
        />
        <p className={styles.notificationDescription}>{data.weatherDesc}</p>
      </div>
    </div>
  );
}
