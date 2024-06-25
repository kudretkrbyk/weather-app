import { useSelector } from "react-redux";

export default function Firstcomp() {
  const weather = useSelector((state) => state.weather.weather);
  return (
    <div>
      <div className="bg-red-500">
        <h2>redux Weather</h2>
        {weather && (
          <div>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Humidity: {weather.main.humidity} %</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
            <p>City: {weather.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}
