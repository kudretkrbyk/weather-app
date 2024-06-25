// src/hooks/useWeather.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../redux/slices/weatherSlice";
import { fetchForecast } from "../redux/slices/forecastSlice";
import { useGeolocation } from "@uidotdev/usehooks";

const useWeather = () => {
  const dispatch = useDispatch();
  const geolocation = useGeolocation();

  const weather = useSelector((state) => state.weather.weather);
  const forecast = useSelector((state) => state.forecast.forecast);
  const loadingWeather = useSelector((state) => state.weather.loading);
  const loadingForecast = useSelector((state) => state.forecast.loading);
  const errorWeather = useSelector((state) => state.weather.error);
  const errorForecast = useSelector((state) => state.forecast.error);

  useEffect(() => {
    if (geolocation.latitude && geolocation.longitude) {
      dispatch(
        fetchWeather({
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
        })
      );
      dispatch(
        fetchForecast({
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
        })
      );
    }
  }, [geolocation, dispatch]);

  return {
    weather,
    forecast,
    loadingWeather,
    loadingForecast,
    errorWeather,
    errorForecast,
  };
};

export default useWeather;
