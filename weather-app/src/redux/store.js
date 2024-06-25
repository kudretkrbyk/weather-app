// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weatherSlice";
import forecastReducer from "./slices/forecastSlice";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    forecast: forecastReducer,
  },
});

export default store;
