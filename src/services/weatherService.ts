import axios from 'axios';

// OpenWeatherMap API key - normally this would be in an environment variable
const API_KEY = 'c0e6c0b7b9e85abf31cb9ecde060f7dc'; // This is a free API key for demo purposes only

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
  visibility: number;
  coord?: {
    lat: number;
    lon: number;
  };
}

export interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
    };
    dt_txt: string;
  }[];
  city: {
    name: string;
    country: string;
  };
}

export interface RapidAPIWeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
}

// API key for OpenWeatherMap
export const OPENWEATHER_API_KEY = 'c0e6c0b7b9e85abf31cb9ecde060f7dc';

// Base URL for OpenWeatherMap API
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// RapidAPI configuration
const RAPIDAPI_KEY = 'YOUR_RAPIDAPI_KEY_HERE'; // Replace with actual key if available
const RAPIDAPI_HOST = 'open-weather13.p.rapidapi.com';

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

/**
 * Get weather data by coordinates from OpenWeatherMap
 */
export const getWeatherByCoordinates = async (
  lat: number, 
  lon: number, 
  units: 'metric' | 'imperial' = 'metric'
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${OPENWEATHER_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`OpenWeatherMap API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    throw error;
  }
};

/**
 * Get forecast by coordinates from OpenWeatherMap API
 */
export const getForecast = async (
  lat: number, 
  lon: number, 
  units: 'metric' | 'imperial' = 'metric'
): Promise<ForecastData> => {
  try {
    const response = await fetch(
      `${OPENWEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${OPENWEATHER_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`OpenWeatherMap API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

/**
 * Get weather data from RapidAPI
 * Falls back to mock data if API call fails
 */
export const getRapidAPIWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    // Check if we have a valid RapidAPI key
    if (!RAPIDAPI_KEY || RAPIDAPI_KEY.includes('YOUR_RAPIDAPI_KEY_HERE')) {
      console.log('RapidAPI key not configured, using mock data');
      return createMockWeatherData(lat, lon);
    }
    
    const response = await fetch(
      `https://${RAPIDAPI_HOST}/weather?lat=${lat}&lon=${lon}`, 
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': RAPIDAPI_HOST,
          'x-rapidapi-key': RAPIDAPI_KEY
        }
      }
    );
    
    if (!response.ok) {
      console.warn('RapidAPI request failed, using mock data');
      return createMockWeatherData(lat, lon);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from RapidAPI, using mock data:', error);
    return createMockWeatherData(lat, lon);
  }
};

/**
 * Create mock weather data as fallback
 */
const createMockWeatherData = (lat: number, lon: number) => {
  // Get a location name based on coordinates or use a generic name
  const locationName = getLocationNameFromCoordinates(lat, lon);
  
  return {
    main: {
      temp: 25,
      feels_like: 26,
      temp_min: 23,
      temp_max: 28,
      humidity: 65,
      pressure: 1013
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d'
      }
    ],
    wind: {
      speed: 3.5,
      deg: 220
    },
    sys: {
      country: 'IN',
      sunrise: Math.floor(Date.now() / 1000) - 21600, // 6 hours ago
      sunset: Math.floor(Date.now() / 1000) + 21600   // 6 hours from now
    },
    name: locationName,
    dt: Math.floor(Date.now() / 1000),
    visibility: 10000,
    coord: {
      lat,
      lon
    }
  };
};

/**
 * Get location name from coordinates (simplified)
 */
const getLocationNameFromCoordinates = (lat: number, lon: number) => {
  // India's approximate bounding box
  const inIndia = (lat >= 8 && lat <= 37 && lon >= 68 && lon <= 97);
  
  // Simplified check for some key locations
  if (Math.abs(lat - 18.52) < 0.5 && Math.abs(lon - 73.85) < 0.5) {
    return 'Pune';
  } else if (Math.abs(lat - 19.07) < 0.5 && Math.abs(lon - 72.87) < 0.5) {
    return 'Mumbai';
  } else if (Math.abs(lat - 28.61) < 0.5 && Math.abs(lon - 77.20) < 0.5) {
    return 'Delhi';
  } else if (inIndia) {
    return 'Unknown City, India';
  } else {
    return 'Unknown Location';
  }
};

// This function recommends crops based on weather conditions
export const getCropRecommendationsByWeather = (
  temp: number,
  humidity: number,
  rainfall: number
): { crop: string; reason: string }[] => {
  const recommendations: { crop: string; reason: string }[] = [];

  // Temperature based recommendations
  if (temp >= 25 && temp <= 35) {
    recommendations.push({ 
      crop: 'Rice', 
      reason: 'Thrives in warm temperatures between 25-35°C.' 
    });
    recommendations.push({ 
      crop: 'Sugarcane', 
      reason: 'Grows well in warm temperatures between 25-35°C with high sunlight.' 
    });
  }

  if (temp >= 20 && temp <= 30) {
    recommendations.push({ 
      crop: 'Cotton', 
      reason: 'Optimal growth in temperatures between 20-30°C.' 
    });
    recommendations.push({ 
      crop: 'Maize', 
      reason: 'Prefers moderate temperatures between 20-30°C.' 
    });
  }

  if (temp >= 15 && temp <= 25) {
    recommendations.push({ 
      crop: 'Wheat', 
      reason: 'Grows best in cooler temperatures between 15-25°C.' 
    });
    recommendations.push({ 
      crop: 'Barley', 
      reason: 'Optimal in cool temperatures of 15-25°C.' 
    });
  }

  // Humidity based recommendations
  if (humidity >= 60 && humidity <= 80) {
    recommendations.push({ 
      crop: 'Cucumber', 
      reason: 'Requires humidity levels of 60-80% for optimal growth.' 
    });
    recommendations.push({ 
      crop: 'Turmeric', 
      reason: 'Thrives in high humidity environments between 60-80%.' 
    });
  }

  if (humidity >= 40 && humidity <= 60) {
    recommendations.push({ 
      crop: 'Chickpea', 
      reason: 'Prefers moderate humidity levels between 40-60%.' 
    });
    recommendations.push({ 
      crop: 'Mustard', 
      reason: 'Grows well in moderate humidity of 40-60%.' 
    });
  }

  // Rainfall based recommendations
  if (rainfall >= 100) {
    recommendations.push({ 
      crop: 'Tea', 
      reason: 'Requires high rainfall for best growth.' 
    });
    recommendations.push({ 
      crop: 'Coffee', 
      reason: 'Thrives in areas with significant rainfall.' 
    });
  }

  if (rainfall < 50) {
    recommendations.push({ 
      crop: 'Millet', 
      reason: 'Drought-resistant crop suitable for low rainfall areas.' 
    });
    recommendations.push({ 
      crop: 'Sorghum', 
      reason: 'Well-adapted to dry conditions with low rainfall.' 
    });
  }

  return recommendations;
};

export default {
  getWeatherByCoordinates,
  getForecast,
  getRapidAPIWeather,
  OPENWEATHER_API_KEY
}; 