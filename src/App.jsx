import { useState } from "react";
import "./App.css";

function App() {
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("Kathmandu");
  const [error, setError] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmedCity = cityInput.trim();

    if (!trimmedCity) {
      setError("Please enter a city name.");
      return;
    }

    setCity(trimmedCity);
    setCityInput("");
    setError("");
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
          <button type="submit" className="search-button">Search</button>
        </form>

        {error && <p className="search-error">{error}</p>}

        <section className="weather-card">
          <div className="weather-location">
            <h2>{city}</h2>
            <p>Today, September 24</p>
          </div>

          <div className="weather-main">
            <div className="weather-icon">☀️</div>
            <div className="temperature">
              <span>24</span>
              <span className="degree">°C</span>
            </div>
          </div>

          <p className="condition">Sunny</p>

          <div className="weather-details">
            <div className="detail-item"><span className="detail-icon">💧</span><div><p>Humidity</p><strong>65%</strong></div></div>
            <div className="detail-item"><span className="detail-icon">💨</span><div><p>Wind</p><strong>12 km/h</strong></div></div>
            <div className="detail-item"><span className="detail-icon">🌡️</span><div><p>Feels Like</p><strong>25°C</strong></div></div>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header"><h2>Recent Searches</h2></div>
          <div className="history-list">
            <button className="history-item">Kathmandu</button>
            <button className="history-item">Pokhara</button>
            <button className="history-item">Delhi</button>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header"><h2>5-Day Forecast</h2></div>
          <div className="forecast-grid">
            {[
              ["Today", "☀️", "24°C", "Sunny"],
              ["Thu", "🌤️", "25°C", "Partly Cloudy"],
              ["Fri", "🌧️", "22°C", "Rainy"],
              ["Sat", "☁️", "23°C", "Cloudy"],
              ["Sun", "☀️", "26°C", "Sunny"],
            ].map(([day, icon, temp, condition]) => (
              <div className="forecast-card" key={day}>
                <p>{day}</p>
                <span className="forecast-icon">{icon}</span>
                <h3>{temp}</h3>
                <span>{condition}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
