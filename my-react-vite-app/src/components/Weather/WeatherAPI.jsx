import React, { useState } from 'react'
import axios from "axios"



const WeatherAPI = () => {
    const [city, setCity] = useState("")
    const [weather, setWeather] = useState("")
    const [error, setError] = useState("")
    const apiKey = "41bbe61820ab47e7aea201814250602"

    const fetchWeather = async (cityName) => {
    try {
        const res = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7`)
        setWeather(res.data);
        setError(null)
    }   catch (err) {
        setError("City Not Found")
        setWeather(null)
    }
}

const handleSearch = (e) => {
    e.preventDefault()

    if(city.trim() !== ''){
        fetchWeather(city)
    }
}

  return (
    <div className=''>
      <h1>Weather App</h1>
        <form onSubmit={handleSearch}>
            <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            />
        </form>
        {error && <p className=''>{error} </p>}
        {weather && (

            // weather current day
            <div>
                <div>
                    <h2>{weather.location.name}, {weather.location.country}, {weather.location.localtime}</h2>
                    <p>Temperature: {weather.current.temp_c}°C</p>
                    <p>Condition: {weather.current.condition.text}</p>
                    <img src={weather.current.condition.icon} alt="Weather icon" />
                </div>
           
            {weather?.forecast?.forecastday?.map((day, index) =>(
                <div key={index} className="forecast-card">
                   <p>Date: {day.date}</p>
                   <p>Temperature: {day.day.avgtemp_c}°C</p>
                   <p>Condition: {day.day.condition.text}</p>
                   <img src={day.day.condition.icon} alt={day.day.condition.text} />
                 </div>
             ) )}
            </div>    
        )}
    </div>
  )
}

export default WeatherAPI
