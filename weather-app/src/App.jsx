// main page layour & state orchestrator

import { useEffect } from "react";
import { getWeatherData } from "./services/weatherApi";

export default function App() {
  useEffect(() => {
      getWeatherData('London', 'metric')
      .then(data => console.log('Weather Data Received: ', data))
      .catch(err => console.error(err))
    }, [])
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-sky-400">Weather App</h1>
      <p className="text-slate-400 mt-2">Check you browser console (F12) for the weather data!</p>
    </div>
  )
}
