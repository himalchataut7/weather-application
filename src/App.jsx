import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="weather-container">
        <header className="header">
          <h1>Weather Dashboard</h1>
          <p>Check the current weather in your city</p>
        </header>

        <section className="search-section">
          <input
            type="text"
            placeholder="Enter city name..."
            className="search-input"
          />
          <button className="search-button">Search</button>
        </section>

        <section className="weather-card">
          <div className="weather-location">
            <h2>Kathmandu</h2>
            <p>Today, September 23</p>
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
            <div className="detail-item">
              <span className="detail-icon">💧</span>
              <div><p>Humidity</p><strong>65%</strong></div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">💨</span>
              <div><p>Wind</p><strong>12 km/h</strong></div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">🌡️</span>
              <div><p>Feels Like</p><strong>25°C</strong></div>
            </div>
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
            <div className="forecast-card"><p>Today</p><span className="forecast-icon">☀️</span><h3>24°C</h3><span>Sunny</span></div>
            <div className="forecast-card"><p>Thu</p><span className="forecast-icon">🌤️</span><h3>25°C</h3><span>Partly Cloudy</span></div>
            <div className="forecast-card"><p>Fri</p><span className="forecast-icon">🌧️</span><h3>22°C</h3><span>Rainy</span></div>
            <div className="forecast-card"><p>Sat</p><span className="forecast-icon">☁️</span><h3>23°C</h3><span>Cloudy</span></div>
            <div className="forecast-card"><p>Sun</p><span className="forecast-icon">☀️</span><h3>26°C</h3><span>Sunny</span></div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
