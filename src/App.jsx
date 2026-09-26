import { useState } from "react";
import "./App.css";
import { Cloud, CloudRain, CloudSun, Droplets, Eye, Gauge, LocateFixed, Search, Sun, Sunrise, Sunset, Thermometer, Wind } from "lucide-react";
import { getCurrentWeather, getFiveDayForecast } from "./services/weatherApi";

function formatTime(timestamp) {
  if (!timestamp) return "--";

  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function weatherIcon(condition, size=64) {
  const props={size,strokeWidth:1.8,"aria-hidden":true};
  const c=(condition||"").toLowerCase();
  if(c.includes("rain")) return <CloudRain {...props}/>;
  if(c.includes("clear")) return <Sun {...props}/>;
  if(c.includes("cloud")) return <Cloud {...props}/>;
  return <CloudSun {...props}/>;
}

function App() {
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("Kathmandu");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [unit, setUnit] = useState("C");
  const [forecast, setForecast] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const temperature = (value) => {
    if (value === null || value === undefined) return "--";
    return unit === "C" ? Math.round(value) : Math.round((value * 9) / 5 + 32);
  };

  const speedUnit = unit === "C" ? "m/s" : "m/s";
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLocationLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`
          );

          if (!response.ok) {
            throw new Error("Unable to get weather for your location.");
          }

          const data = await response.json();
          const weatherData = {
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

          const forecastData = await getFiveDayForecast(data.name);

          setWeather(weatherData);
          setForecast(forecastData);
          setCity(data.name);
          setCityInput(data.name);
          setSearchHistory((previousHistory) => [
            data.name,
            ...previousHistory.filter(
              (item) => item.toLowerCase() !== data.name.toLowerCase()
            ),
          ].slice(0, 5));
        } catch (err) {
          setError(err.message);
        } finally {
          setLocationLoading(false);
        }
      },
      () => {
        setError("Location permission was denied or unavailable.");
        setLocationLoading(false);
      }
    );
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const trimmedCity = cityInput.trim();

    if (!trimmedCity) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const [data, forecastData] = await Promise.all([
        getCurrentWeather(trimmedCity),
        getFiveDayForecast(trimmedCity),
      ]);

      setWeather(data);
      setForecast(forecastData);
      setCity(data.name);
      setCityInput("");
      setSearchHistory((previousHistory) => {
        const updatedHistory = [
          data.name,
          ...previousHistory.filter(
            (item) => item.toLowerCase() !== data.name.toLowerCase()
          ),
        ];

        return updatedHistory.slice(0, 5);
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="weather-container">
        <header className="header">
          <h1>Weather Dashboard</h1>
          <p>Check the current weather in your city</p>
        </header>

        <form className="search-section" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter city name..."
            className="search-input"
            value={cityInput}
            onChange={(event) => {
              setCityInput(event.target.value);
              if (error) setError("");
            }}
            aria-label="City name"
          />

          <button type="submit" className="search-button" disabled={loading}>
            <><Search size={18} aria-hidden="true" />{loading ? "Searching..." : "Search"}</>
          </button>
        </form>

        {loading && (
          <div className="status-message loading-message" role="status">
            Fetching weather data...
          </div>
        )}

        {error && (
          <div className="status-message error-message" role="alert">
            {error}
          </div>
        )}

        <button
          type="button"
          className="location-button"
          onClick={handleUseLocation}
          disabled={locationLoading || loading}
        >
          <><LocateFixed size={18} aria-hidden="true" />{locationLoading ? "Getting location..." : "Use My Location"}</>
        </button>

        <div className="unit-toggle" aria-label="Temperature unit">
          <button
            type="button"
            className={unit === "C" ? "unit-button active" : "unit-button"}
            onClick={() => setUnit("C")}
          >
            °C
          </button>
          <button
            type="button"
            className={unit === "F" ? "unit-button active" : "unit-button"}
            onClick={() => setUnit("F")}
          >
            °F
          </button>
        </div>

        <section className="weather-card">
          {loading ? (
            <div className="weather-state">
              <div className="loading-spinner" aria-hidden="true"></div>
              <h2>Loading weather...</h2>
              <p>Please wait while we fetch the latest conditions.</p>
            </div>
          ) : weather ? (
            <>
              <div className="weather-location">
                <h2>
                  {weather.name}, {weather.country}
                </h2>
                <p>Current weather conditions</p>
              </div>

              <div className="weather-main">
                <div className="weather-icon" aria-label={weather.description}>{weatherIcon(weather.condition)}</div>

                <div className="temperature">
                  <span>{temperature(weather.temperature)}</span>
                  <span className="degree">°C</span>
                </div>
              </div>

              <div className="condition-block">
                <p className="condition">{weather.condition}</p>
                <p className="weather-description">{weather.description}</p>
              </div>

              <div className="weather-details">
                <div className="detail-item">
                  <Droplets className="detail-icon" size={22} />
                  <div>
                    <p>Humidity</p>
                    <strong>{weather.humidity}%</strong>
                  </div>
                </div>

                <div className="detail-item">
                  <Wind className="detail-icon" size={22} />
                  <div>
                    <p>Wind</p>
                    <strong>{weather.windSpeed} m/s</strong>
                  </div>
                </div>

                <div className="detail-item">
                  <Thermometer className="detail-icon" size={22} />
                  <div>
                    <p>Feels Like</p>
                    <strong>{temperature(weather.feelsLike)}°{unit}</strong>
                  </div>
                </div>

                <div className="detail-item">
                  <Gauge className="detail-icon" size={22} />
                  <div>
                    <p>Pressure</p>
                    <strong>{weather.pressure} hPa</strong>
                  </div>
                </div>

                <div className="detail-item">
                  <Eye className="detail-icon" size={22} />
                  <div>
                    <p>Visibility</p>
                    <strong>{weather.visibility} km</strong>
                  </div>
                </div>

                <div className="detail-item">
                  <Sunrise className="detail-icon" size={22} />
                  <div>
                    <p>Sunrise</p>
                    <strong>{formatTime(weather.sunrise)}</strong>
                  </div>
                </div>

                <div className="detail-item">
                  <Sunset className="detail-icon" size={22} />
                  <div>
                    <p>Sunset</p>
                    <strong>{formatTime(weather.sunset)}</strong>
                  </div>
                </div>

                <div className="detail-item">
                  <Thermometer className="detail-icon" size={22} />
                  <div>
                    <p>Temperature</p>
                    <strong>{temperature(weather.temperature)}°C</strong>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="weather-location">
                <h2>{city}</h2>
                <p>Search for a city to get live weather data</p>
              </div>

              <div className="weather-main">
                <div className="weather-icon">{weatherIcon("Clouds")}</div>
                <div className="temperature">
                  <span>--</span>
                  <span className="degree">°C</span>
                </div>
              </div>

              <p className="condition">No weather data yet</p>
            </>
          )}
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Recent Searches</h2>
          </div>

          <div className="history-list">
            {searchHistory.length > 0 ? (
              searchHistory.map((item) => (
                <button
                  className="history-item"
                  key={item}
                  type="button"
                  onClick={() => setCityInput(item)}
                >
                  {item}
                </button>
              ))
            ) : (
              <p className="empty-history">No searches yet.</p>
            )}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>5-Day Forecast</h2>
          </div>

          <div className="forecast-grid">
            {forecast.length > 0 ? (
              forecast.map((day) => (
                <div className="forecast-card" key={day.date}>
                  <p>
                    {new Date(day.date * 1000).toLocaleDateString([], {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <span className="forecast-icon">{weatherIcon(day.condition,42)}</span>
                  <h3>{temperature(day.temperature)}°{unit}</h3>
                  <span>{day.condition}</span>
                </div>
              ))
            ) : (
              <p className="empty-history">Search for a city to load its forecast.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
