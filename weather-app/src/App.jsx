import { useState, useEffect } from "react";
import { useGeolocation } from "@uidotdev/usehooks";
import axios from "axios";

function App() {
  const [weather, setWeather] = useState();
  const geolocation = useGeolocation();

  useEffect(() => {
    const getWeatherData = async (lat, lon) => {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      console.log(apiKey);

      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        setWeather(data);
        console.log(data);
      } catch {
        console.log("Hava durumu verileri alınamadı.");
      }
    };

    if (geolocation.latitude && geolocation.longitude) {
      getWeatherData(geolocation.latitude, geolocation.longitude);
    }
  }, [geolocation]);
  return (
    <>
      <div className="text-blue-500">hava durumu</div>
      {weather && (
        <div>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity} %</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>şehir {weather.name} </p>
        </div>
      )}
    </>
  );
}

export default App;
