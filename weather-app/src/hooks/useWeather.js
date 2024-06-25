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
    const fetchData = async () => {
      // Check local storage for cached data
      const cachedWeatherData = JSON.parse(localStorage.getItem("weatherData"));
      const cachedForecastData = JSON.parse(
        localStorage.getItem("forecastData")
      );
      console.log(cachedWeatherData);
      console.log("tahmin", cachedForecastData);

      if (
        cachedWeatherData &&
        cachedForecastData &&
        new Date().getTime() - cachedWeatherData.timestamp <
          24 * 60 * 60 * 1000 &&
        new Date().getTime() - cachedForecastData.timestamp <
          24 * 60 * 60 * 1000
      ) {
        // Use cached data if it's less than 24 hours old
        dispatch({
          type: "weather/setWeather",
          payload: cachedWeatherData.data,
        });
        dispatch({
          type: "forecast/setForecast",
          payload: cachedForecastData.data,
        });
      } else {
        // Fetch new data from API if no valid cached data found or expired
        if (geolocation.latitude && geolocation.longitude) {
          try {
            const weatherResponse = await fetchWeather({
              latitude: geolocation.latitude,
              longitude: geolocation.longitude,
            })(dispatch);
            const forecastResponse = await fetchForecast({
              latitude: geolocation.latitude,
              longitude: geolocation.longitude,
            })(dispatch);

            // Save new data to local storage
            localStorage.setItem(
              "weatherData",
              JSON.stringify({
                data: weatherResponse.data,
                timestamp: new Date().getTime(),
              })
            );
            localStorage.setItem(
              "forecastData",
              JSON.stringify({
                data: forecastResponse.data,
                timestamp: new Date().getTime(),
              })
            );
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      }
    };

    fetchData();
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
