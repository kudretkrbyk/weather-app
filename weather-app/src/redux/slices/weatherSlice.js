import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const userLanguages = navigator.languages || [navigator.language];
const userPrimaryLanguage = userLanguages[0];

// Hava durumu bilgisi almak için createAsyncThunk tanımlayalım
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async ({ latitude, longitude }) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${userPrimaryLanguage}&units=metric`
    );
    return response.data;
  }
);

// weatherSlice'ı createSlice kullanarak tanımlayalım
const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weather: null,
    loading: false,
    error: null,
  },
  reducers: {
    setWeather: (state, action) => {
      state.weather = action.payload;
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
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setWeather, setLoading, setError } = weatherSlice.actions;

export default weatherSlice.reducer;
