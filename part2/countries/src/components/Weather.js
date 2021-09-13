import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const [ weatherData, setWeatherData ] = useState()

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        const url = 'http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + capital
        
        axios
            .get(url)
            .then(response =>{
                console.log('Weather report fetched successfully')
                console.log(response.data)
                setWeatherData(response.data)
            })
    }, [capital])

    if (weatherData) {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                temperature: {weatherData.current.temperature} Celsius<br></br>
                <img src={weatherData.current.weather_icons} alt="Today's weather"></img><br></br>
                wind: {weatherData.current.wind_speed} mph direction {weatherData.current.ind_dir}
            </div>
        )
    } else {
        return null
    }
}

export default Weather