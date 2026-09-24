const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

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
    windSpeed: data.wind.speed,
    condition: data.weather[0].main,
    icon: data.weather[0].icon,
  };
}
