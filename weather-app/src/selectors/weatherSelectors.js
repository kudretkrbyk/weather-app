import { createSelector } from "reselect";

const selectWeather = (state) => state.weather.weather;

export const makeSelectWeather = createSelector(
  selectWeather,
  (weather) => weather
);
