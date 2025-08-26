// services/weatherService.js
import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = async (lat, lon) => {
  const response = await axios.get(BASE_URL, {
    params: {
      lat,
      lon,
      units: 'imperial', // Celsius (use 'imperial' for °F)
      appid: API_KEY,
    },
  })
  return response.data
}

export default { getWeather }