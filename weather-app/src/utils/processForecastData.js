export const processForecastData = (forecastData) => {
  const groupedData = forecastData.reduce((acc, current) => {
    const date = new Date(current.dt * 1000).toLocaleDateString(); // Tarihi al

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(current);
    return acc;
  }, {});

  const dailyForecast = Object.keys(groupedData).map((date) => {
    const earliestForecast = groupedData[date].reduce((earliest, current) => {
      return current.dt < earliest.dt ? current : earliest;
    });

    const dateForWeekDay = new Date(earliestForecast.dt * 1000);
    const day = dateForWeekDay.toLocaleDateString("tr-TR", { weekday: "long" }); // Gün ismini al
    return {
      date: date,
      day: day,
      weather: earliestForecast.weather[0].description,
      wind: earliestForecast.wind.speed,
      temp: Math.floor(earliestForecast.main.temp),
      minTemp: Math.floor(earliestForecast.main.temp_min),
      maxTemp: Math.floor(earliestForecast.main.temp_max),
    };
  });

  return dailyForecast;
};
