import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import Tailwind CSS library
import 'tailwindcss/tailwind.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [artwork, setArtwork] = useState(null);
    const [clothingRecommendation, setClothingRecommendation] = useState('');
    const API_KEY = '24ec70fa159b7ff2bc4fdc716b276194';

    useEffect(() => {
        fetchWeather();
    }, []); // Fetch weather data on component mount

    const fetchWeather = async () => {
        try {
            console.log('Fetching weather data for city:', city); // Log city name before API request
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            console.log('API Response:', response.data); // Log API response data
            setWeatherData(response.data);
            generateArtwork(response.data); // Generate artwork based on weather data
            generateClothingRecommendation(response.data); // Generate clothing recommendation based on weather data
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const generateArtwork = (weatherData) => {
        if (weatherData) {
            const currentTime = new Date().getHours(); // Get current hour
            const weatherCondition = weatherData.weather[0].main;
    
            let artwork = null;
    
            switch (weatherCondition) {
                case 'Clear':
                    if (currentTime >= 6 && currentTime < 18) {
                        artwork = (
                            <div className="bg-yellow-200 p-4 rounded-lg shadow-md">
                                <p>Sunny and clear skies during the day ☀️</p>
                                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                                <p>Humidity: {weatherData.main.humidity}%</p>
                                <p>Visibility: {weatherData.visibility / 1000} km</p>
                            </div>
                        );
                    } else {
                        artwork = (
                            <div className="bg-blue-900 text-white p-4 rounded-lg shadow-md">
                                <p>Starry skies at night ✨</p>
                                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                                <p>Humidity: {weatherData.main.humidity}%</p>
                                <p>Visibility: {weatherData.visibility / 1000} km</p>
                            </div>
                        );
                    }
                    break;
                case 'Clouds':
                    artwork = (
                        <div className="bg-gray-300 p-4 rounded-lg shadow-md">
                            <p>Cloudy skies ☁️</p>
                            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                            <p>Humidity: {weatherData.main.humidity}%</p>
                            <p>Visibility: {weatherData.visibility / 1000} km</p>
                        </div>
                    );
                    break;
                case 'Rain':
                    artwork = (
                        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
                            <p>Rainy and cloudy 🌧️</p>
                            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                            <p>Humidity: {weatherData.main.humidity}%</p>
                            <p>Visibility: {weatherData.visibility / 1000} km</p>
                        </div>
                    );
                    break;
                case 'Snow':
                    artwork = (
                        <div className="bg-white text-gray-900 p-4 rounded-lg shadow-md">
                            <p>Snowy conditions ❄️</p>
                            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                            <p>Humidity: {weatherData.main.humidity}%</p>
                            <p>Visibility: {weatherData.visibility / 1000} km</p>
                        </div>
                    );
                    break;
                case 'Thunderstorm':
                    artwork = (
                        <div className="bg-purple-700 text-white p-4 rounded-lg shadow-md">
                            <p>Thunderstorm ⛈️</p>
                            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                            <p>Humidity: {weatherData.main.humidity}%</p>
                            <p>Visibility: {weatherData.visibility / 1000} km</p>
                        </div>
                    );
                    break;
                case 'Mist':
                    artwork = (
                        <div className="bg-gray-500 text-white p-4 rounded-lg shadow-md">
                            <p>Misty conditions 🌫️</p>
                            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                            <p>Humidity: {weatherData.main.humidity}%</p>
                            <p>Visibility: {weatherData.visibility / 1000} km</p>
                        </div>
                    );
                    break;
                // Add more cases for other weather conditions as needed
                default:
                    artwork = <p className="text-red-500">No artwork available for this weather condition</p>;
            }
    
            setArtwork(artwork); // Set the generated artwork
        }
    };
    
    const generateClothingRecommendation = (weatherData) => {
        if (weatherData) {
            const temperature = weatherData.main.temp;
            const humidity = weatherData.main.humidity;

            let recommendation = '';

            // Determine clothing recommendation based on temperature and humidity
            if (temperature >= 30 && humidity < 50) {
                recommendation = 'It\'s hot and dry. Wear light and breathable clothing like cotton shirts and shorts.';
            } else if (temperature >= 30 && humidity >= 50) {
                recommendation = 'It\'s hot and humid. Wear light clothing with moisture-wicking properties to stay comfortable.';
            } else if (temperature < 10) {
                recommendation = 'It\'s cold outside. Layer up with a warm jacket, sweater, and thermal undergarments.';
            } else if (temperature >= 10 && temperature < 20) {
                recommendation = 'It\'s cool. Wear a light jacket or sweater.';
            } else if (temperature >= 20 && temperature < 30) {
                recommendation = 'It\'s warm. A t-shirt and shorts or a casual dress would be comfortable.';
            }

            setClothingRecommendation(recommendation); // Set the detailed clothing recommendation
        }
    };

    const handleSearch = () => {
        console.log('Search clicked! City:', city); // Log city name when search button is clicked
        fetchWeather();
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
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

            {/* Artwork display */}
            {artwork && (
                <div className="mt-6">
                    <h3 className="text-lg font-bold mb-2">Weather-Inspired Artwork</h3>
                    {artwork}
                </div>
            )}

            {/* Clothing recommendation display */}
            {clothingRecommendation && (
                <div className="mt-6">
                    <h3 className="text-lg font-bold mb-2">Clothing Recommendation</h3>
                    <p>{clothingRecommendation}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
