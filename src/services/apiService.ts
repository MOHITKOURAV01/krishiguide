import axios from 'axios';

// Simple placeholder for weather data
export const getWeatherData = async (lat: number, lng: number) => {
  try {
    // Return a dummy response that matches the expected structure
    return {
      current: {
        temp_c: 0,
        condition: { text: 'Unknown' },
        humidity: 0,
        wind_kph: 0
      }
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

// You can add more API services as needed 