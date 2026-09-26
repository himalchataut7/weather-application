# Weather Application
# screen short
desktop view-(images/DESKTOPVIEW-VIEW.png)
mobile view-(images/mobile-view.png)
WEATHER DETAIL-(5-DAYS-FORCAST.png)
A modern, responsive weather dashboard built with **React + Vite** that provides current weather conditions, a five-day forecast, city search, search history, temperature unit conversion, and browser-based geolocation.

## 🚀 Live Demo

**Live Website:** https://weather-app.himalchataut.com.np

**GitHub Repository:** https://github.com/himalchataut7/weather-application

## Features

-  Search weather by city
-  Use current device location
-  Display current weather conditions
-  Celsius / Fahrenheit temperature toggle
-  Five-day weather forecast
-  Recent search history
-  Humidity information
-  Wind speed
-  Feels-like temperature
-  Atmospheric pressure
-  Visibility
-  Sunrise and sunset information
-  Loading states
-  User-friendly error handling
-  Responsive design for mobile, tablet, and desktop
-  SVG-based weather and interface icons

## Tech Stack

- **React**
- **Vite**
- **JavaScript (ES6+)**
- **CSS3**
- **Lucide React** for SVG icons
- **OpenWeather API** for weather data
- **Browser Geolocation API** for location-based weather

## Project Structure

```text
weather-application/
├── src/
│   ├── services/
│   │   └── weatherApi.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/himalchataut7/weather-application.git
cd weather-application
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the OpenWeather API key

Create a `.env` file in the project root:

```env
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
```

Do not commit your `.env` file or expose your API key publicly.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL shown by Vite in your browser.

## API

This project uses the **OpenWeather API** for current weather and five-day forecast data.

The application reads the API key through the Vite environment variable:

```text
VITE_OPENWEATHER_API_KEY
```

The API key should remain in your local `.env` file and should not be committed to Git.

## Responsive Design

The dashboard is designed to adapt to:

- Desktop screens
- Laptop screens
- Tablets
- Mobile phones
- Small mobile screens

The search controls, weather information, forecast cards, and search history adjust their layout according to the available screen width.

## Geolocation

The **Use My Location** feature uses the browser's Geolocation API.

When the user allows location access:

1. The browser provides the current coordinates.
2. The application requests weather data for those coordinates.
3. The detected city is displayed in the weather dashboard.
4. The detected city is also placed into the search field.
5. The city's forecast is loaded.
6. The location is added to recent searches.

Location permission is controlled by the user's browser.

## Temperature Units

The dashboard supports:

- Celsius (°C)
- Fahrenheit (°F)

The unit toggle converts displayed temperatures without requiring another weather API request.

## Application Flow

```text
User
  │
  ├── Search for city
  │       │
  │       ▼
  │   OpenWeather API
  │       │
  │       ▼
  │   Current Weather
  │       │
  │       ├── Temperature
  │       ├── Conditions
  │       ├── Humidity
  │       ├── Wind
  │       ├── Pressure
  │       ├── Visibility
  │       └── Sunrise / Sunset
  │
  └── Use My Location
          │
          ▼
    Browser Geolocation
          │
          ▼
    Weather API
          │
          ▼
    Location Weather
```

## Main Components

### `App.jsx`

Handles:

- City search
- Weather state
- Loading state
- Error state
- Search history
- Temperature unit conversion
- Geolocation
- Current weather display
- Five-day forecast display

### `weatherApi.js`

Handles communication with OpenWeather and provides functions for:

- Current weather
- Five-day forecast

## Environment Variables

Example configuration:

```env
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
```

The `.gitignore` file should keep environment files out of Git:

```text
.env
.env.local
.env.*.local
```

## Development Stages

The project was developed incrementally:

| Stage | Feature |
|---|---|
| 1 | Project initialization |
| 2 | Weather dashboard layout |
| 3 | City search functionality |
| 4 | Weather API integration |
| 5 | Current weather conditions |
| 6 | Loading and error states |
| 7 | Search history |
| 8 | Temperature unit toggle |
| 9 | Five-day forecast |
| 10 | Geolocation and dashboard polish |
| 11 | Improved location search, SVG icons, and mobile responsiveness |

## Future Improvements

Possible future enhancements include:

- Persistent search history with local storage
- Weather alerts
- Hourly forecast
- Air quality information
- Weather maps
- Dark/light theme
- More detailed accessibility improvements
- Better offline handling
- Automated testing

## Author

**Himal Chataut**

GitHub: https://github.com/himalchataut7

##  License

This project is available for educational and personal use. Add a project-specific license if you plan to distribute or modify the project under a formal open-source license.
