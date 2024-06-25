import useWeather from "./hooks/useWeather";

import Navbar from "./components/Navbar";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import main from "./assets/main.svg";

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
      <div className="z-50 w-full h-screen relative overflow-y-hidden bg-gradient-to-b from-[#031027] to-[#271010] flex flex-col gap-4 items-center ">
        <div className="z-10 absolute w-full h-full overflow-hidden">
          <img className="w-full h-full " src={main}></img>
        </div>
        <Navbar></Navbar>
        {weather && (
          // <div>
          //   <p className="text-red-500">Temperature: {weather.main.temp} °C</p>
          //   <p>Humidity: {weather.main.humidity} %</p>
          //   <p>Wind Speed: {weather.wind.speed} m/s</p>
          //   <p>City: {weather.name}</p>
          // </div>
          <Weather></Weather>
        )}
        {forecast && forecast.length > 0 && (
          <Forecast></Forecast>
          // <div>
          //   <h2>Forecast:</h2>
          //   {forecast.map((day, index) => (
          //     <div key={index}>
          //       <p>Date: {new Date(day.dt * 1000).toLocaleDateString()}</p>

          //       <p>Weather: {day.weather[0].description}</p>
          //     </div>
          //   ))}
          //   <Firstcomp></Firstcomp>
          // </div>
        )}
      </div>
    </>
  );
}

export default App;
