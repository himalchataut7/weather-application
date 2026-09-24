import { useState } from "react";
import "./App.css";
import { getCurrentWeather } from "./services/weatherApi";

function formatTime(timestamp) {
  if (!timestamp) return "--";

  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function App() {
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("Kathmandu");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false);

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
      const data = await getCurrentWeather(trimmedCity);

      setWeather(data);
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
            {loading ? "Searching..." : "Search"}
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
                <div className="weather-icon">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.description}
                  />
                </div>

                <div className="temperature">
                  <span>{Math.round(weather.temperature)}</span>
                  <span className="degree">°C</span>
                </div>
              </div>

              <div className="condition-block">
                <p className="condition">{weather.condition}</p>
                <p className="weather-description">{weather.description}</p>
              </div>

              <div className="weather-details">
                <div className="detail-item">
                  <span className="detail-icon">💧</span>
                  <div>
                    <p>Humidity</p>
                    <strong>{weather.humidity}%</strong>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">💨</span>
                  <div>
                    <p>Wind</p>
                    <strong>{weather.windSpeed} m/s</strong>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">🌡️</span>
                  <div>
                    <p>Feels Like</p>
                    <strong>{Math.round(weather.feelsLike)}°C</strong>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">⏲️</span>
                  <div>
                    <p>Pressure</p>
                    <strong>{weather.pressure} hPa</strong>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">👁️</span>
                  <div>
                    <p>Visibility</p>
                    <strong>{weather.visibility} km</strong>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">🌅</span>
                  <div>
                    <p>Sunrise</p>
                    <strong>{formatTime(weather.sunrise)}</strong>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">🌇</span>
                  <div>
                    <p>Sunset</p>
                    <strong>{formatTime(weather.sunset)}</strong>
                  </div>
                </div>

                <div className="detail-item">
                  <span className="detail-icon">🌡️</span>
                  <div>
                    <p>Temperature</p>
                    <strong>{Math.round(weather.temperature)}°C</strong>
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
                <div className="weather-icon">🌤️</div>
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
            <div className="forecast-card">
              <p>Today</p>
              <span className="forecast-icon">☀️</span>
              <h3>--</h3>
              <span>Coming soon</span>
            </div>

            <div className="forecast-card">
              <p>Thu</p>
              <span className="forecast-icon">🌤️</span>
              <h3>--</h3>
              <span>Coming soon</span>
            </div>

            <div className="forecast-card">
              <p>Fri</p>
              <span className="forecast-icon">🌧️</span>
              <h3>--</h3>
              <span>Coming soon</span>
            </div>

            <div className="forecast-card">
              <p>Sat</p>
              <span className="forecast-icon">☁️</span>
              <h3>--</h3>
              <span>Coming soon</span>
            </div>

            <div className="forecast-card">
              <p>Sun</p>
              <span className="forecast-icon">☀️</span>
              <h3>--</h3>
              <span>Coming soon</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
