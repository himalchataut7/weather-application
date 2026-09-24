import { useState } from "react";
import "./App.css";
import { getCurrentWeather } from "./services/weatherApi";

function App() {
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("Kathmandu");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
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

        {error && <p className="search-error">{error}</p>}

        <section className="weather-card">
          {weather ? (
            <>
              <div className="weather-location">
                <h2>{weather.name}</h2>
                <p>{weather.country}</p>
              </div>

              <div className="weather-main">
                <div className="weather-icon">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.condition}
                  />
                </div>

                <div className="temperature">
                  <span>{Math.round(weather.temperature)}</span>
                  <span className="degree">°C</span>
                </div>
              </div>

              <p className="condition">{weather.condition}</p>

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
            <button className="history-item">Kathmandu</button>
            <button className="history-item">Pokhara</button>
            <button className="history-item">Delhi</button>
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
