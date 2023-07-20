import { WeatherForecastResponseDTO } from "../../../api/dto/notification.dto";

interface NotificationProps {
  data: WeatherForecastResponseDTO;
}

export default function Notification({ data }: NotificationProps) {
  return (
    <div>
      <p>{data.local}</p>
      <p>MAX: {data.maxTemp}°C</p>
      <p>MIN: {data.minTemp}°C</p>
      <p>{new Date(data.date).toLocaleDateString()}</p>
      <p>Umidade do ar: {data.humidity}%</p>
      <img src={`https://openweathermap.org/img/wn/${data.weatherIcon}.png`} alt="icon" />
      <p>Chances de chuva {data.rainProb * 100}%</p>
      <p>Velocidade do vento: {data.windSpeed}Km/H</p>
      <p>{data.weatherDesc}</p>
      {data.alert && <p>Alerta: {data.alert}</p>}
    </div>
  );
}
