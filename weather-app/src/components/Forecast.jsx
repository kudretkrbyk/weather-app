import { useSelector } from "react-redux";
import { processForecastData } from "../utils/processForecastData";
import sunSvg from "../assets/sun.svg";

export default function Forecast() {
  const forecast = useSelector((state) => state.forecast.forecast);
  const dailyForecast = processForecastData(forecast);
  console.log("filtrelenmiş forecast", dailyForecast);
  return (
    <div className="z-50 flex flex-col w-7/12 text-white bg-[#021A33] p-5 rounded-2xl shadow-2xl">
      <div className="p-3">Haftalık Tahmin Raporu</div>
      <div className="w-full h-[2px] bg-black"></div>

      <div className=" flex gap-3 w-full">
        {dailyForecast.map((forecast, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 items-center justify-center w-full p-5"
          >
            <div>
              <div> {forecast.date}</div>
              <div> {forecast.day}</div>
            </div>
            <div>
              <img className="" src={sunSvg} alt="Icon" />
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
}
