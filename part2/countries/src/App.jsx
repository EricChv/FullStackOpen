import { useState, useEffect } from 'react'
import countriesService from './services/countriesService'
import Filter from './components/Filter'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    countriesService.getAll().then(data => setCountries(data))
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

    console.log(filteredCountries)

  return (
    <div>
      <h1 className="site-title">World Atlas</h1>
      <Filter 
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      {/* 
      if filter is empty, show a message
      if no countries match the filter, show a message
      if more than 10 countries match, show a message to specify
      if exactly one country matches, show its details
      if multiple countries match, list their names 
      */}
      {filteredCountries.length === 0 && <div>No countries found</div>}
      {filter && filteredCountries.length > 10 && <div>Too many matches, be more specific</div>}
      {filteredCountries.length === 1 && (
      <div className="country-details">
        <h2 className="country-title">{filteredCountries[0].name.common}</h2>
        <p>Capital: {filteredCountries[0].capital}</p>
        <p>Population: {filteredCountries[0].population.toLocaleString()}</p>
        <p>
          {Object.values(filteredCountries[0].languages).length === 1 ? 'Language' : 'Languages'}: 
          {` ${Object.values(filteredCountries[0].languages).join(', ')}`}
        </p>
        <img
          src={filteredCountries[0].flags.png}
          alt={`Flag of ${filteredCountries[0].name.common}`}
        />
      </div>
    )}
      {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
        <ul>
          {filteredCountries.map(country => (
            <li key={country.name.common}>{country.name.common}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App