// main page layour & state orchestrator

import { useEffect } from "react";
import { getWeatherData } from "./services/weatherApi";
import { useWeather } from "./hooks/useWeather"

export default function App() {
  const { weatherData, loading, error, units, searchCity, toggleUnits } = useWeather("London")
  useEffect(() => {
      getWeatherData('London', 'metric')
      .then(data => console.log('Weather Data Received: ', data))
      .catch(err => console.error(err))
    }, [])
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header Title */}
        <header className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-sky-400">🌤️ Weather Dashboard</h1>

          {/* UnitToggle later */}
        </header>
        {/* search bar placeholder */}

        {/* loading state */}
        {loading && (
          <div className="text-center py-12 text-slate-400 animate-pulse">
            Loading weather data...
          </div>
        )}

        {/* error state */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl text-center">
            {error}
          </div>
        )}

        {/* weaterh content */}
        {!loading && !error && weatherData && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-6 rounded-3xl">
              <h2 className="text-xl font-semibold text-slate-200">
                {weatherData.current.name}. {weatherData.current.sys.country}
              </h2>
              <p className="text-5xl font-extrabold text-white mt-4">
                {Math.round(weatherData.current.main.temp)}°{units === 'metric' ? 'C' : 'F'}
              </p>
              <p className="text-slate-400 capitalize mt-1">
                {weatherData.current.weather[0].description}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
