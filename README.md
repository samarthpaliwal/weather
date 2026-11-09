# Weather App

A single-page React application that looks up the current weather for a city. You type a city name, the app calls the WeatherAPI.com `current.json` endpoint, and it shows location, temperature in Celsius, condition text and icon, humidity and wind speed. The page background switches to a night image after dark and to a beach image when the condition is sunny. The project was bootstrapped with Create React App (`react-scripts` 5).

## Requirements

- Node.js 18 or newer and npm
- A free API key from https://www.weatherapi.com/

## Setup

```bash
git clone https://github.com/samarthpaliwal/weather.git
cd weather
npm install
```

The WeatherAPI key is currently a hard-coded constant `API_KEY` near the top of `src/App.js`. Replace it with your own key before running. Because the key is in client-side code (and in git history), treat it as public and keep it on a free, rate-limited plan.

A cleaner approach, which the code does not do yet, is to read it from an environment variable that Create React App exposes at build time:

```env
# .env (local only, not committed)
REACT_APP_WEATHER_API_KEY=your_weatherapi_key_here
```

and in `src/App.js` use `const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;`.

## Usage

```bash
npm start
```

Open http://localhost:3000. Enter a city name and click **Get Weather**. On success the panel shows the city and country, temperature, condition, humidity and wind speed. If WeatherAPI returns an error (unknown city) the app shows "City not found"; a network failure shows "Failed to fetch weather data."

Other scripts from Create React App:

```bash
npm run build   # production build to build/
npm test        # Jest watch mode (see note below)
npm run eject   # one-way: copies CRA config into the project
```

Note: `src/App.test.js` is the unmodified CRA template test that looks for a "learn react" link, so it fails against this app.

## How it works

- `src/index.js` mounts `App` into `#root` from `public/index.html` and calls `reportWebVitals()`.
- `src/App.js` keeps three pieces of state with `useState`: the typed city, the parsed weather response and an error string. `fetchWeather` does a `fetch` to `https://api.weatherapi.com/v1/current.json?key=...&q=<city>` and stores `data` or sets an error.
- `getBackgroundImage` picks `/images/owl.jpg` when `current.is_day === 0`, `/images/beach.jpg` when the condition text contains "sunny", otherwise no image. The file in `public/images/` is named `Beach.jpg` with a capital B; on case-sensitive hosts the sunny background will not load until the name or the path is made to match.
- Styling lives in `src/App.css` and `src/index.css`.

## Project layout

```
weather/
├── public/
│   ├── index.html
│   ├── images/Beach.jpg, owl.jpg   # background images
│   └── manifest.json, favicon, logos
├── src/
│   ├── index.js            # React root
│   ├── App.js              # UI, fetch call, background logic
│   ├── App.css, index.css
│   ├── App.test.js         # CRA template test (not updated)
│   ├── reportWebVitals.js
│   └── setupTests.js
└── package.json            # react-scripts start/build/test/eject
```
