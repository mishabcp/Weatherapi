import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const API_KEY = '24ec70fa159b7ff2bc4fdc716b276194';

    const fetchWeather = async () => {
        try {
            console.log('Fetching weather data for city:', city); // Log city name before API request
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            console.log('API Response:', response.data); // Log API response data
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };
    
    const handleSearch = () => {
        console.log('Search clicked! City:', city); // Log city name when search button is clicked
        fetchWeather();
    };
    

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter city name"
            />
            <button
                onClick={handleSearch}
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            >
                Search
            </button>

            {/* Weather data display with Tailwind classes */}
            {weatherData && (
                <div className="mt-4">
                    <h2 className="text-xl font-bold">{weatherData.name}</h2>
                    <p className="text-lg">Temperature: {weatherData.main.temp}°C</p>
                    <p className="text-lg">Description: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
