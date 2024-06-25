// src/redux/slices/forecastSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const userLanguages = navigator.languages || [navigator.language];
const userPrimaryLanguage = userLanguages[0];

export const fetchForecast = createAsyncThunk(
  "forecast/fetchForecast",
  async ({ latitude, longitude }) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${userPrimaryLanguage}&units=metric`
    );
    return response.data;
  }
);

const forecastSlice = createSlice({
  name: "forecast",
  initialState: {
    forecast: null,
    loading: false,
    error: null,
  },
  reducers: {
    setForecast: (state, action) => {
      state.forecast = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.forecast = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setForecast, setLoading, setError } = forecastSlice.actions;

export default forecastSlice.reducer;
