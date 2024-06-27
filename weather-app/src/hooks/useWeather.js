import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, fetchWeatherByCity } from "../redux/slices/weatherSlice";
import {
  fetchForecast,
  fetchForecastByCity,
} from "../redux/slices/forecastSlice";

const useWeather = ({ city, latitude, longitude }) => {
  const dispatch = useDispatch();

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

      if (city) {
        try {
          const weatherResponse = await dispatch(
            fetchWeatherByCity(city)
          ).unwrap();
          const forecastResponse = await dispatch(
            fetchForecastByCity(city)
          ).unwrap();

          // Save new data to local storage
          localStorage.setItem(
            "weatherData",
            JSON.stringify({
              data: weatherResponse,
              timestamp: new Date().getTime(),
            })
          );
          localStorage.setItem(
            "forecastData",
            JSON.stringify({
              data: forecastResponse,
              timestamp: new Date().getTime(),
            })
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else if (latitude && longitude) {
        try {
          const weatherResponse = await dispatch(
            fetchWeather({
              latitude,
              longitude,
            })
          ).unwrap();
          const forecastResponse = await dispatch(
            fetchForecast({
              latitude,
              longitude,
            })
          ).unwrap();

          // Save new data to local storage
          localStorage.setItem(
            "weatherData",
            JSON.stringify({
              data: weatherResponse,
              timestamp: new Date().getTime(),
            })
          );
          localStorage.setItem(
            "forecastData",
            JSON.stringify({
              data: forecastResponse,
              timestamp: new Date().getTime(),
            })
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else if (
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
      }
    };

    fetchData();
  }, [city, latitude, longitude, dispatch]);

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
