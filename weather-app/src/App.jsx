import { useGeolocation } from "@uidotdev/usehooks";

import React, { memo, useState, useCallback } from "react";
import main from "./assets/main.svg";
import useWeather from "./hooks/useWeather";
import Weather from "./components/Weather";
import Navbar from "./components/Navbar";
import Forecast from "./components/Forecast";

const MemoizedWeather = React.memo(Weather);
const MemoizedForecast = React.memo(Forecast);

const App = memo(function App() {
  console.log("App component re-rendered");
  const [city, setCity] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const {
    weather,
    forecast,
    loadingWeather,
    loadingForecast,
    errorWeather,
    errorForecast,
  } = useWeather({ city, longitude, latitude });

  const handleUseLocation = useCallback(() => {
    console.log("app use location geldi");
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      setCity(""); // city state'ini boş olarak ayarla
    });
  }, []);

  console.log("App city", city);

  return (
    <>
      <div className="z-50 w-full h-screen relative lg:overflow-y-hidden bg-gradient-to-b dark:from-[#031027] dark:to-[#271010] from-[#F9FFFF] to-[#38C8E6] flex flex-col gap-2 items-center p-2 ">
        <div className="z-10 absolute w-full h-screen left-0 top-0 overflow-hidden">
          <img className="w-full h-screen " src={main} alt="Background"></img>
        </div>

        <Navbar setCity={setCity} handleUseLocation={handleUseLocation} />

        <MemoizedWeather
          loadingWeather={loadingWeather}
          errorWeather={errorWeather}
        />

        {forecast && (
          <MemoizedForecast
            loadingForecast={loadingForecast}
            errorForecast={errorForecast}
          />
        )}
      </div>
    </>
  );
});

export default App;
