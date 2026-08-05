import { useState, useEffect, useCallback } from "react"
import { getWeatherData } from '../services/weatherApi'

export function useWeather(initialCity = 'London') {
    const [city, setCity] = useState(initialCity)
    const [units, setUnits] = useState('metric')
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // fetch weather whenever city or units change
    const fetchWeather = useCallback(async (seachCity, unitSystem) => {
        setLoading(true)
        setError(null)
        try {
            const data = await getWeatherData(seachCity, unitSystem)
            setWeatherData(data)
        } catch (err) {
            setError(err.message || 'An unexpected error ocurred')
            setWeatherData(null)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchWeather(city, units)
    }, [city, units, fetchWeather])

    // function to search fro a new city
    const searchCity = (newCity) => {
        if (newCity.trim()) {
            setCity(newCity.trim())
        }
    }

    // function to toggle units between metric and imperial
    const toggleUnits = (newUnit) => {
        if (newUnit !== units) {
            setUnits(newUnit)
        }
    }

    return {
        weatherData,
        loading,
        error,
        city,
        units,
        searchCity,
        toggleUnits
    }
}