import React, { useState } from 'react';
import './App.css';

const API_KEY = "a04e5929303f4d69bb275132252306"; // Your WeatherAPI key

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      const data = await response.json();

      if (data.error) {
        setError("City not found");
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch (err) {
      setError("Failed to fetch weather data.");
      setWeather(null);
    }
  };

  function getBackgroundImage(weather) {
    if (!weather) return 'none';

    const condition = weather.current.condition.text.toLowerCase();
    const isNight = weather.current.is_day === 0;

    if (isNight) return "url('/images/owl.jpg')";
    if (condition.includes('sunny')) return "url('/images/beach.jpg')";

    return 'none';
  }

  return (
    <div
      className="background-wrapper"
      style={{
        backgroundImage: getBackgroundImage(weather),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100vw',
      }}
    >
      <div className="app-container">
        <h1>Weather App</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={fetchWeather}>Get Weather</button>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2>{weather.location.name}, {weather.location.country}</h2>
            <p>Temperature: {weather.current.temp_c} °C</p>
            <p>Condition: {weather.current.condition.text}</p>
            <img src={weather.current.condition.icon} alt="Weather Icon" />
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Wind Speed: {weather.current.wind_kph} kph</p>
          </div>
        )}
      </div>
    </div>
  );

}

export default App;
