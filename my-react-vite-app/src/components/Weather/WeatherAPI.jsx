import React, { useState } from 'react'
import axios from "axios"
import "./WeatherStyles.css"

const weatherBackgrounds = {
    "Sunny": "url('/backgrounds/sun_GIF.gif')",
    "Partly cloudy": "url('/backgrounds/Cloudy_GIF.gif')",
    "Partly Cloudy ": "url('/backgrounds/Cloudy_GIF.gif')",
    "Cloudy ": "url('/backgrounds/heavy_clouds_GIF.gif')",
    "Overcast": "url('/backgrounds/fog_mist_GIF.gif')",
    "Rain": "url('/backgrounds/rainy_day_night_GIF.gif')",
    "Patchy rain possible": "url('/backgrounds/rainy_day_night_GIF.gif')",
    "Patchy rain nearby": "url('/backgrounds/rainy_day_night_GIF.gif')",
    "Light rain": "url('/backgrounds/rainy_day_night_GIF.gif')",
    "Snow": "url('/backgrounds/snow_gif.GIF')",
    "Light snow": "url('/backgrounds/snow_GIF.gif')",
    "Thunder": "url('/backgrounds/thunder_GIF.gif')",
    "Mist": "url('/backgrounds/fog_mist_GIF.gif')",
    "Fog": "url('/backgrounds/fog_mist_GIF.gif')",
    "Freezing fog": "url('/backgrounds/Freezing_fog_GIF.gif')",
    "Default": "url('/backgrounds/earth_GIF.gif')"
};

// Ensure weather condition exists and map to background

const WeatherAPI = () => {
    const [city, setCity] = useState("")
    const [weather, setWeather] = useState("")
    const [error, setError] = useState("")
    const apiKey = ""

    // const selectedDayWeather = weather?.current?.condition?.text;
    // const backgroundImage = weatherBackgrounds[selectedDayWeather] || weatherBackgrounds["Default"];
    

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
    <div 
      className='weather-container'
    //   style={{ 
    //     backgroundImage: `${backgroundImage}`, 
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     backgroundRepeat: "no-repeat",
    //     height: "100vh",
    //     transition: "background 0.5s ease-in-out" 
    //   }}
    >
      
      <h1>Weather App</h1>
  
      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <input
          type='text'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
        />
      </form>
  
      {/* Error Message */}
      {error && <p className='error-message'>{error}</p>}
  
      {/* Weather Data */}
      {weather && (
        <div className="forecast-container">
          
          {/* Include Current Day + 7-Day Forecast */}
          {[weather?.current, ...weather?.forecast?.forecastday]?.map((day, index) => {

            
            // Identify if it's today
            const isToday = index === 0;
            // keys into the weather condition of the current day 
            const dayWeather = isToday ? weather?.current?.condition?.text : day.day.condition.text;
            // keys into current temp or average temperature
            const dayTemp = isToday ? weather?.current?.temp_c : day.day.avgtemp_c;
            // icon of the current day
            const dayIcon = isToday ? weather?.current?.condition?.icon : day.day.condition.icon;
            // day/date
            const dayDate = isToday ? weather?.location?.localtime.split(" ")[0] : day.date;
  
            // Select background image
            // const formattedWeather = dayWeather.trim();
            const dayBackground = weatherBackgrounds[dayWeather] || weatherBackgrounds["Default"];


            console.log("Weather Condition:", dayWeather);
            console.log("Background URL:", weatherBackgrounds[dayWeather]);

  
            return (
            <div 
              key={index} 
              className="forecast-card"
              style={{
                backgroundImage: dayBackground,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}
              >
            <div className='text-container'>
                <p>{isToday ? "Today" : dayDate.split("-").reverse().join("-")}</p>
                <p>
                    <strong>Temperature: </strong> 
                    {Math.round((isToday ? weather?.current?.temp_c : day.day.avgtemp_c) * 9/5 + 32)}°F
                </p>
                {/* <p>Temperature: {dayTemp}°C</p> */}
                <p>Condition: {dayWeather}</p>
                <img src={dayIcon} alt={dayWeather} />
                </div>
              </div>
            );
          })}
  
        </div>
      )}
    </div>
  );
}
export default WeatherAPI
