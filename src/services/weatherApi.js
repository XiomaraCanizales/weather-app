const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * fetches current weather and 5-day forecast for a given city and unit standard.
 * @param {string} city - e.g. "London", "Tokyo"
 * @param {string} units - "metric" (°C) or "imperial" (°F)
 */

export async function getWeatherData(city, units = 'metric'){
    if (!API_KEY) {
        throw new Error('API key is missing. Check your .env.local file.')
    }

    // 1. fetch current weather & forecast simultaneously using Promise.all
    const [currentResponse, forecastResponse] = await Promise.all([
        fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${API_KEY}`),
        fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=${units}&appid=${API_KEY}`)
    ])

    //2. handle HTPP errors (eg city not found 404)
    if(!currentResponse.ok) {
        if(currentResponse.status === 404) {
            throw new Error(`City "${city}" not found. Please try another search.`)
        }
        throw new Error('Failed to fetch weather data. Please try again later.')
    }

    const currentData = await currentResponse.json()
    const forescatData = await forecastResponse.json()

    return {
        current: currentData,
        forecast: forescatData
    }
}

export function getWeatherIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
