import useWeather from "./hooks/useWeather";

function App() {
  console.log("app re-rendered");
  const {
    weather,
    forecast,
    loadingWeather,
    loadingForecast,
    errorWeather,
    errorForecast,
  } = useWeather();

  if (loadingWeather || loadingForecast) {
    return <p>Loading...</p>;
  }

  if (errorWeather || errorForecast) {
    return <p>Error: {errorWeather || errorForecast}</p>;
  }

  return (
    <>
      <div className="text-blue-500">Hava Durumu</div>
      {weather && (
        <div>
          <p className="text-red-500">Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity} %</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>City: {weather.name}</p>
        </div>
      )}
      {forecast && forecast.length > 0 && (
        <div>
          <h2>Forecast:</h2>
          {forecast.map((day, index) => (
            <div key={index}>
              <p>Date: {new Date(day.dt * 1000).toLocaleDateString()}</p>

              <p>Weather: {day.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
