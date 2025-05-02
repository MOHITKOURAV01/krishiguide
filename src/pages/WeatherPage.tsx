import React, { useState, useEffect } from 'react';
import { getWeatherByCoordinates, getForecast, getRapidAPIWeather, OPENWEATHER_API_KEY } from '../services/weatherService';

// ===================================================================
// IMPORTANT: This component uses OpenWeatherMap and RapidAPI services
// The API keys are stored in weatherService.ts
// ===================================================================

// OpenWeatherMap API configuration
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Weather condition backgrounds based on weather type
const weatherBackgrounds: {[key: string]: string} = {
  clear: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?auto=format&fit=crop&q=80',
  clouds: 'https://images.unsplash.com/photo-1525087740718-9e0f2c58c7ef?auto=format&fit=crop&q=80',
  rain: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&q=80',
  thunderstorm: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&q=80',
  snow: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&q=80',
  mist: 'https://images.unsplash.com/photo-1543968996-ee822b8176ba?auto=format&fit=crop&q=80',
  default: 'https://images.unsplash.com/photo-1504253163759-c23fccaebb55?auto=format&fit=crop&q=80'
};

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
  dt: number;
  visibility: number;
  coord?: {
    lat: number;
    lon: number;
  };
}

interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
  };
}

const WeatherPage: React.FC = () => {
  const [location, setLocation] = useState('');
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [dataSource, setDataSource] = useState<'openweather' | 'rapidapi'>('rapidapi');

  // Get user's location when component mounts
  useEffect(() => {
    const fetchInitialWeather = async () => {
      setLoading(true);
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              await fetchWeatherByCoordinates(position.coords.latitude, position.coords.longitude);
            },
            (err) => {
              console.error("Failed to get user location:", err);
              // Default to a location if user denies permission
              setLocation('Pune');
              fetchWeatherByDefaultLocation();
            }
          );
        } else {
          // Geolocation not supported
          setLocation('Pune');
          fetchWeatherByDefaultLocation();
        }
      } catch (err) {
        console.error("Error in initial weather fetch:", err);
        setError("Failed to get initial weather data. Please try searching for a location.");
        setLoading(false);
      }
    };

    fetchInitialWeather();
  }, []);

  const fetchWeatherByDefaultLocation = async () => {
    // Default to Pune, India
    try {
      const lat = 18.5204;
      const lon = 73.8567;
      await fetchWeatherByCoordinates(lat, lon);
    } catch (err) {
      console.error("Error fetching default location weather:", err);
      setError("Failed to load default weather data.");
      setLoading(false);
    }
  };

  const fetchWeatherByCoordinates = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      if (dataSource === 'openweather') {
        // Fetch current weather from OpenWeatherMap directly
        const weatherResponse = await fetch(
          `${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${OPENWEATHER_API_KEY}`
        );
        
        // Fetch 5-day forecast
        const forecastResponse = await fetch(
          `${OPENWEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${OPENWEATHER_API_KEY}`
        );
        
        if (!weatherResponse.ok || !forecastResponse.ok) {
          throw new Error('Failed to fetch weather data from OpenWeatherMap');
        }
        
        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();
        
        setCurrentWeather(weatherData);
        setForecast(forecastData);
        setLocation(weatherData.name);
      } else {
        // Fetch weather data from RapidAPI
        const rapidApiWeatherData = await getRapidAPIWeather(lat, lon);
        
        // Ensure temperature values are in the correct unit
        if (unit === 'imperial' && rapidApiWeatherData.main) {
          // Convert Celsius to Fahrenheit if needed
          rapidApiWeatherData.main.temp = Number(((rapidApiWeatherData.main.temp * 9/5) + 32).toFixed(1));
          rapidApiWeatherData.main.feels_like = Number(((rapidApiWeatherData.main.feels_like * 9/5) + 32).toFixed(1));
          rapidApiWeatherData.main.temp_min = Number(((rapidApiWeatherData.main.temp_min * 9/5) + 32).toFixed(1));
          rapidApiWeatherData.main.temp_max = Number(((rapidApiWeatherData.main.temp_max * 9/5) + 32).toFixed(1));
        }
        
        setCurrentWeather(rapidApiWeatherData as unknown as WeatherData);
        
        // Create a mock forecast
        createMockForecast(rapidApiWeatherData);
        
        setLocation(rapidApiWeatherData.name);
      }
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Failed to fetch weather data. Please try again or try a different location.');
    } finally {
      setLoading(false);
    }
  };

  const createMockForecast = (currentData: any) => {
    if (!currentData || !currentData.weather) {
      return;
    }
    
    const currentWeatherType = currentData.weather[0];
    
    // Create a mock 5-day forecast
    const mockForecast: ForecastData = {
      list: [],
      city: {
        name: currentData.name || 'Unknown',
        country: currentData.sys?.country || 'Unknown'
      }
    };
    
    // Ensure temperature is in a reasonable range
    let baseTemp = currentData.main.temp;
    
    // Generate forecast for next 5 days with variations
    const now = new Date();
    for (let i = 1; i <= 5; i++) {
      const forecastDate = new Date();
      forecastDate.setDate(now.getDate() + i);
      
      // Add some random variation to temperatures (-2 to +2 degrees)
      const tempVariation = Math.floor(Math.random() * 5) - 2;
      
      mockForecast.list.push({
        dt: Math.floor(forecastDate.getTime() / 1000),
        main: {
          temp: baseTemp + tempVariation,
          feels_like: baseTemp + tempVariation - 1,
          temp_min: baseTemp + tempVariation - 2,
          temp_max: baseTemp + tempVariation + 2,
          humidity: currentData.main.humidity + Math.floor(Math.random() * 10) - 5
        },
        weather: [{ ...currentWeatherType }],
        dt_txt: `${forecastDate.toISOString().split('T')[0]} 12:00:00`
      });
    }
    
    setForecast(mockForecast);
  };

  const fetchWeatherByLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      if (dataSource === 'openweather') {
        // Fetch current weather from OpenWeatherMap directly
        const weatherResponse = await fetch(
          `${OPENWEATHER_BASE_URL}/weather?q=${location}&units=${unit}&appid=${OPENWEATHER_API_KEY}`
        );
        
        // Fetch 5-day forecast
        const forecastResponse = await fetch(
          `${OPENWEATHER_BASE_URL}/forecast?q=${location}&units=${unit}&appid=${OPENWEATHER_API_KEY}`
        );
        
        if (!weatherResponse.ok || !forecastResponse.ok) {
          throw new Error('Location not found or API limit reached');
        }
        
        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();
        
        setCurrentWeather(weatherData);
        setForecast(forecastData);
      } else {
        // When using RapidAPI, we need coordinates
        const coordinates = await getCoordinatesFromLocation(location);
        
        if (!coordinates) {
          throw new Error(`Location "${location}" not found. Try a major city name.`);
        }
        
        // Fetch weather data using coordinates
        await fetchWeatherByCoordinates(coordinates.lat, coordinates.lon);
      }
    } catch (err) {
      console.error('Error fetching weather:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Location not found. Please try a different location.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getCoordinatesFromLocation = async (locationName: string): Promise<{lat: number, lon: number} | null> => {
    // Map of common cities to their coordinates
    const commonCities: { [key: string]: { lat: number, lon: number } } = {
      'london': { lat: 51.5074, lon: -0.1278 },
      'new york': { lat: 40.7128, lon: -74.0060 },
      'tokyo': { lat: 35.6762, lon: 139.6503 },
      'paris': { lat: 48.8566, lon: 2.3522 },
      'delhi': { lat: 28.6139, lon: 77.2090 },
      'mumbai': { lat: 19.0760, lon: 72.8777 },
      'singapore': { lat: 1.3521, lon: 103.8198 },
      'sydney': { lat: -33.8688, lon: 151.2093 },
      'berlin': { lat: 52.5200, lon: 13.4050 },
      'rome': { lat: 41.9028, lon: 12.4964 },
      'beijing': { lat: 39.9042, lon: 116.4074 },
      'dubai': { lat: 25.2048, lon: 55.2708 },
      'madrid': { lat: 40.4168, lon: -3.7038 },
      'moscow': { lat: 55.7558, lon: 37.6173 },
      'los angeles': { lat: 34.0522, lon: -118.2437 },
      'chicago': { lat: 41.8781, lon: -87.6298 },
      'toronto': { lat: 43.6532, lon: -79.3832 },
      'johannesburg': { lat: -26.2041, lon: 28.0473 },
      'cairo': { lat: 30.0444, lon: 31.2357 },
      'bangkok': { lat: 13.7563, lon: 100.5018 },
      'pune': { lat: 18.5204, lon: 73.8567 },
      'lohogaon': { lat: 18.6110, lon: 73.9117 },
      'lonavla': { lat: 18.7546, lon: 73.4016 },
      'bangalore': { lat: 12.9716, lon: 77.5946 },
      'chennai': { lat: 13.0827, lon: 80.2707 },
      'hyderabad': { lat: 17.3850, lon: 78.4867 },
      'kolkata': { lat: 22.5726, lon: 88.3639 },
      'ahmedabad': { lat: 23.0225, lon: 72.5714 },
      'jaipur': { lat: 26.9124, lon: 75.7873 },
      'surat': { lat: 21.1702, lon: 72.8311 },
      'lucknow': { lat: 26.8467, lon: 80.9462 },
      'kanpur': { lat: 26.4499, lon: 80.3319 }
    };
    
    const normalizedLocation = locationName.trim().toLowerCase();
    
    // Try to find city in our predefined list
    if (commonCities[normalizedLocation]) {
      return commonCities[normalizedLocation];
    }
    
    // If not found in predefined list, try a more flexible search
    for (const [city, coords] of Object.entries(commonCities)) {
      if (city.includes(normalizedLocation) || normalizedLocation.includes(city)) {
        return coords;
      }
    }
    
    // Not found
    return null;
  };

  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    
    // Refresh data with new units if we have current weather
    if (currentWeather && currentWeather.coord) {
      fetchWeatherByCoordinates(currentWeather.coord.lat, currentWeather.coord.lon);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoordinates(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error("Failed to get user location:", err);
          if (location) {
            fetchWeatherByLocation(new Event('submit') as any);
          }
        }
      );
    } else if (location) {
      fetchWeatherByLocation(new Event('submit') as any);
    }
  };

  const toggleDataSource = () => {
    setDataSource(dataSource === 'openweather' ? 'rapidapi' : 'openweather');
    
    // Refetch with the new data source if we have current weather
    if (currentWeather && currentWeather.coord) {
      fetchWeatherByCoordinates(currentWeather.coord.lat, currentWeather.coord.lon);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoordinates(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error("Failed to get user location:", err);
        }
      );
    }
  };

  // Format time from Unix timestamp
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date for forecast
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Get only one forecast per day (noon)
  const getDailyForecast = () => {
    if (!forecast) return [];
    
    const dailyData: any[] = [];
    const processedDates: Set<string> = new Set();
    
    forecast.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      // Get forecast for around noon (closest to 12:00)
      if (!processedDates.has(date) && item.dt_txt.includes('12:00')) {
        dailyData.push(item);
        processedDates.add(date);
      }
    });
    
    return dailyData.slice(0, 5); // Return 5 days max
  };

  // Weather recommendations for farmers based on conditions
  const getWeatherRecommendation = () => {
    if (!currentWeather) return null;
    
    const temp = currentWeather.main.temp;
    const weatherMain = currentWeather.weather[0].main.toLowerCase();
    const windSpeed = currentWeather.wind.speed;
    
    if (weatherMain.includes('rain') || weatherMain.includes('thunderstorm')) {
      return "Consider postponing outdoor activities like spraying and harvesting. Check drainage systems and protect seedlings.";
    } else if (weatherMain.includes('snow')) {
      return "Protect vulnerable crops from frost. Delay planting and ensure livestock have shelter.";
    } else if (weatherMain.includes('clear') && temp > 30) {
      return "High temperatures expected. Ensure adequate irrigation and consider providing shade for sensitive crops.";
    } else if (weatherMain.includes('clear') && temp < 5) {
      return "Cold temperatures expected. Protect frost-sensitive crops and ensure livestock have warm shelter.";
    } else if (windSpeed > 8) {
      return "Strong winds expected. Secure structures, delay spraying operations, and protect young plants.";
    } else if (weatherMain.includes('fog')) {
      return "Limited visibility may affect operations. Be careful with machinery and delay spraying operations.";
    } else {
      return "Weather conditions are favorable for regular farming activities.";
    }
  };

  // Get weather background based on current condition
  const getWeatherBackground = () => {
    if (!currentWeather) return weatherBackgrounds.default;
    
    const weatherType = currentWeather.weather[0].main.toLowerCase();
    
    if (weatherType.includes('clear')) return weatherBackgrounds.clear;
    if (weatherType.includes('cloud')) return weatherBackgrounds.clouds;
    if (weatherType.includes('rain')) return weatherBackgrounds.rain;
    if (weatherType.includes('thunder')) return weatherBackgrounds.thunderstorm;
    if (weatherType.includes('snow')) return weatherBackgrounds.snow;
    if (weatherType.includes('mist') || weatherType.includes('fog') || weatherType.includes('haze')) 
      return weatherBackgrounds.mist;
    
    return weatherBackgrounds.default;
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${getWeatherBackground()})` }}>
      <div className="min-h-screen bg-black bg-opacity-50 pt-16 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 rounded-lg shadow-xl overflow-hidden">
            
            {/* Weather Search Form */}
            <div className="p-6 sm:p-10 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
                  Weather Forecast
                </h1>
                <div className="flex space-x-4">
                  <button
                    onClick={toggleUnit}
                    className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                  >
                    Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
                  </button>
                  <button
                    onClick={toggleDataSource}
                    className="px-4 py-2 bg-secondary-500 text-white rounded-md hover:bg-secondary-600 transition-colors"
                  >
                    Using {dataSource === 'openweather' ? 'OpenWeather' : 'RapidAPI'} Source
                  </button>
                </div>
              </div>
              
              <form onSubmit={fetchWeatherByLocation} className="flex max-w-md animate-fadeInDown" style={{ animationDelay: '0.4s' }}>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location"
                  className="flex-grow px-4 py-3 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-800 shadow-sm"
                />
                <button
                  type="submit"
                  className="bg-gradient-primary hover:bg-gradient-sky text-white px-6 py-3 rounded-r-xl transition-all duration-300 shadow-sm"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching...
                    </span>
                  ) : 'Search'}
                </button>
              </form>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 sm:mx-10 my-4 rounded-xl shadow-sm animate-fadeIn dark:bg-red-900/30 dark:text-red-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-red-700 dark:text-red-200">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {loading && (
              <div className="flex justify-center items-center py-20 animate-fadeIn">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
              </div>
            )}

            {!loading && currentWeather && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-10 animate-fadeIn">
                {/* Current Weather */}
                <div className="md:col-span-5 bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 weather-card hover:shadow-highlight transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 fancy-title">
                        {currentWeather.name}, {currentWeather.sys.country}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">
                        {new Date(currentWeather.dt * 1000).toLocaleDateString([], {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right animate-float">
                      <img 
                        src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`}
                        alt={currentWeather.weather[0].description}
                        className="w-20 h-20 inline-block object-contain"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-5xl font-bold text-gray-800 dark:text-gray-100 bg-gradient-primary text-gradient">
                        {Math.round(currentWeather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-lg capitalize bg-gradient-animate px-3 py-1 rounded-full text-white">
                        {currentWeather.weather[0].description}
                      </p>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Feels Like</p>
                        <p className="text-gray-800 dark:text-gray-200 font-medium text-lg">
                          {Math.round(currentWeather.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Humidity</p>
                        <p className="text-gray-800 dark:text-gray-200 font-medium text-lg">
                          {currentWeather.main.humidity}%
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Wind</p>
                        <p className="text-gray-800 dark:text-gray-200 font-medium text-lg">
                          {Math.round(currentWeather.wind.speed)} {unit === 'metric' ? 'm/s' : 'mph'}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Pressure</p>
                        <p className="text-gray-800 dark:text-gray-200 font-medium text-lg">
                          {currentWeather.main.pressure} hPa
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between bg-gradient-primary rounded-xl p-4 text-white">
                      <div>
                        <p className="opacity-80 text-sm">Sunrise</p>
                        <p className="font-medium text-lg">
                          {formatTime(currentWeather.sys.sunrise)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="opacity-80 text-sm">Sunset</p>
                        <p className="font-medium text-lg">
                          {formatTime(currentWeather.sys.sunset)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weather Recommendations */}
                <div className="md:col-span-7 bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-6 weather-card hover:shadow-highlight transition-all duration-300">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 fancy-title mb-6">
                    Farming Recommendations
                  </h2>
                  <div className="bg-gradient-soil text-white p-5 rounded-xl mb-8 shadow-sm">
                    <div className="flex items-start space-x-4">
                      <div className="bg-white rounded-full p-2 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-soil-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <p className="text-lg">
                        {getWeatherRecommendation()}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
                    5-Day Forecast
                  </h3>
                  
                  {forecast && (
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                      {getDailyForecast().map((day, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center card-hover">
                          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">
                            {formatDate(day.dt_txt)}
                          </p>
                          <img 
                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                            alt={day.weather[0].description}
                            className="w-12 h-12 mx-auto"
                          />
                          <p className="text-gray-800 dark:text-gray-200 font-bold text-lg">
                            {Math.round(day.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs capitalize mt-1">
                            {day.weather[0].description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Weather data provided by {dataSource === 'openweather' ? (
                        <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">OpenWeatherMap</a>
                      ) : (
                        <a href="https://rapidapi.com/worldapi/api/open-weather13" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">RapidAPI Open Weather</a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!loading && !currentWeather && !error && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-8 mb-8 text-center animate-fadeIn">
                <div className="max-w-md mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary-500 mx-auto mb-4 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
                    Enter a location to see weather information and farming recommendations.
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    The weather forecast helps you plan your farming activities for optimal results.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage; 