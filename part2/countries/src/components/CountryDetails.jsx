import { useState, useEffect } from 'react'
import weatherService from '../services/weatherService'

function CountryDetails({ country }) {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    // only fetch if capitalInfo has lat/lng (some tiny countries may not)
    if (country.capitalInfo?.latlng) {
      const [lat, lon] = country.capitalInfo.latlng
      weatherService.getWeather(lat, lon).then(data => {
        setWeather(data)
      })
    }
  }, [country]) // re-run if a new country is selected

  return (
    <div className="country-details">
      <h2 className="country-title">{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>
        {Object.values(country.languages).length === 1 ? 'Language' : 'Languages'}: 
        {` ${Object.values(country.languages).join(', ')}`}
      </p>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
      />

      {/* Weather section */}
      {weather ? (
        <div className="weather">
          <h3>Weather in {country.capital}</h3>
          <p>Condition: {weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>Temperature: {weather.main.temp} °f</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  )
}

export default CountryDetails