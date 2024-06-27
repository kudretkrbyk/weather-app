import { useSelector } from "react-redux";
import { processForecastData } from "../utils/processForecastData";

import { memo } from "react";

const Forecast = memo(function Forecast({ loadingForecast, errorForecast }) {
  console.log("forecast re rendered");
  const forecast = useSelector((state) => state.forecast.forecast);
  console.log(forecast);
  const dailyForecast = processForecastData(forecast);
  console.log("filtrelenmiş forecast", dailyForecast);

  if (loadingForecast) {
    return <div>Loading forecast...</div>;
  }

  if (errorForecast) {
    return <p>Error loading forecast: {errorForecast}</p>;
  }

  return (
    <div className="z-50 flex flex-col w-full lg:w-7/12 dark:text-white text-[#021A33] dark:bg-[#021A33] bg-slate-300 p-3 rounded-2xl shadow-2xl">
      <div className="p-1">Haftalık Tahmin Raporu</div>
      <div className="w-full h-[2px] bg-black"></div>

      <div className="flex  gap-1 w-full text-nowrap">
        {dailyForecast.map((forecast, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 items-center justify-center w-full p-3"
          >
            <div>
              <div> {forecast.date}</div>
              <div> {forecast.day}</div>
            </div>
            <div>
              <img className="" src={forecast.icon} alt="Icon" />
            </div>
            <div>{forecast.weather} </div>

            <div className="flex">
              <div> {forecast.maxTemp} </div>
              <div>/</div>
              <div> {forecast.minTemp} </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
export default Forecast;
