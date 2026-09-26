const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export async function getCurrentWeather(city) {
  if (!API_KEY) {
    throw new Error(
      "OpenWeather API key is missing. Add VITE_OPENWEATHER_API_KEY to your .env file."
    );
  }

  const response = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );

  if (response.status === 404) {
    throw new Error("City not found. Please check the city name.");
  }

  if (!response.ok) {
    throw new Error("Unable to fetch weather data. Please try again.");
  }

  const data = await response.json();

  return {
    name: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    visibility: data.visibility ? data.visibility / 1000 : 0,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    condition: data.weather[0].main,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
}


export async function getFiveDayForecast(city) {
  if (!API_KEY) {
    throw new Error(
      "OpenWeather API key is missing. Add VITE_OPENWEATHER_API_KEY to your .env file."
    );
  }

  const response = await fetch(
    `${FORECAST_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );

  if (response.status === 404) {
    throw new Error("City not found. Please check the city name.");
  }

  if (!response.ok) {
    throw new Error("Unable to fetch forecast data. Please try again.");
  }

  const data = await response.json();

  const daily = data.list.filter((item) => item.dt_txt.includes("12:00:00"));

  return daily.slice(0, 5).map((item) => ({
    date: item.dt,
    temperature: item.main.temp,
    condition: item.weather[0].main,
    description: item.weather[0].description,
    icon: item.weather[0].icon,
  }));
}
