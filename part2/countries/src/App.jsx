import { useState, useEffect } from 'react'
import countriesService from './services/countriesService'
import Filter from './components/Filter'
import CountryDetails from './components/CountryDetails';
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [darkMode, setDarkMode] = useState(false);


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelectedCountry(null) // Reset selected country when filter changes
  }

  // Fetch countries data on initial render
  useEffect(() => {
    countriesService.getAll().then(data => setCountries(data))
  }, [])

  // Toggle dark mode class on body
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode)
  }, [darkMode])

  // Filter countries based on the filter input
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  // Handle showing country details when a country is selected
  const handleShow = (country) => {
    console.log('Showing country:', country)
    setSelectedCountry(country)
  }

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

      {/* Render selected country if one is chosen explicitly */}
      {selectedCountry && <CountryDetails country={selectedCountry} />}

      {/* Only render this if no selected country */}
      {!selectedCountry && filteredCountries.length === 1 && (
        <CountryDetails country={filteredCountries[0]} />
      )}

      {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
        <ul>
          {filteredCountries.map(country => (
            <li key={country.name.common} className="country-item">
              <span className="country-name">{country.name.common}</span>
              <button onClick={() => handleShow(country)}>⌞ ⌝</button>  
            </li>
          ))}
          
        </ul>
      )}

      <button 
        className="dark-mode-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  )
}
export default App