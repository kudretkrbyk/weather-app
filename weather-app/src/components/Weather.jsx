import { useSelector } from "react-redux";
import sunSvg from "../assets/sun.svg";

export default function Weather() {
  const weather = useSelector((state) => state.weather.weather);
  //console.log("deneme", weather.weather[0].description);
  return (
    <div className="z-50 flex flex-col bg-[#021A33] p-5 items-center justify-center w-7/12 gap-2 text-white rounded-2xl">
      <div className="text-3xl">Bugün için Hava Durumu</div>
      {weather && (
        <div className="flex items-center justify-around w-full">
          <div className="flex flex-col items-start justify-start w-full gap-1 p-6">
            <div>{weather.name}</div>

            <div className="flex items-center justify-start w-full gap-5">
              <div className="">
                <img className="size-" src={sunSvg} alt="Icon" />
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
              <th>{weather.main.feels_like}°C</th>
            </tr>
            <tr className="text-left">
              <th>nem</th>
              <th>{weather.main.humidity}</th>
            </tr>
            <tr className="text-left">
              <th>rüzgar</th>
              <th>{weather.wind.speed}</th>
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
