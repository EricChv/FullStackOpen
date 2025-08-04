function CountryDetails({ country }) {
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
    </div>
  );
}

export default CountryDetails;