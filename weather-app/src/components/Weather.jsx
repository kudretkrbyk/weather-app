import { useSelector } from "react-redux";
import selectWeatherIcon from "../utils/selectWeatherIcon";
import { makeSelectWeather } from "../selectors/weatherSelectors";
import { useEffect, useState } from "react";

function Weather({ loadingWeather, errorWeather }) {
  console.log("weather re rendered");
  const weather = useSelector(makeSelectWeather);
  const [weatherIcon, setWeatherIcon] = useState("");
  useEffect(() => {
    if (weather) {
      setWeatherIcon(selectWeatherIcon(weather.weather[0].main));
    }
  }, [weather]);

  //console.log("deneme", weather.weather[0].description);

  if (loadingWeather) {
    return <div>Loading weather...</div>;
  }

  if (errorWeather) {
    return <p>Error loading weather: {errorWeather}</p>;
  }
  return (
    <div className="z-50 flex flex-col dark:bg-[#021A33] bg-slate-300 p-3 items-center justify-center w-full lg:w-7/12 gap-2 dark:text-white text-[#021A33] opacity-70 rounded-2xl">
      <div className="text-3xl">Bugün için Hava Durumu</div>
      {weather && (
        <div className="flex items-center justify-around w-full">
          <div className="flex flex-col items-start justify-start w-full gap-1 p-6">
            <div>{weather.name}</div>

            <div className="flex items-center justify-start w-full gap-5">
              <div className="">
                <img className="size-" src={weatherIcon} alt="Icon" />
              </div>
              <div className="flex flex-col items-start justify-center w-full">
                <div className="text-8xl">
                  {" "}
                  {Math.floor(weather.main.temp)}°
                </div>
                <div className="text-xl">{weather.weather[0].description}</div>
              </div>
            </div>
          </div>
          <table className=" table-fixed   w-full">
            <tr className="text-left w-full ">
              <th className="">Hissedilen Sıcaklık</th>
              <th>{Math.floor(weather.main.feels_like)}°C</th>
            </tr>
            <tr className="text-left">
              <th>nem</th>
              <th>{weather.main.humidity}</th>
            </tr>
            <tr className="text-left">
              <th>rüzgar</th>
              <th>{Math.floor(weather.wind.speed)}</th>
            </tr>
            <tr className="text-left">
              <th>basınç</th>
              <th>{weather.main.pressure}</th>
            </tr>
          </table>
        </div>
      )}
    </div>
  );
}
export default Weather;
