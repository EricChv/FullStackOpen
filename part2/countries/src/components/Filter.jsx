const Filter = ({ filter, handleFilterChange }) => (
  <div>
    <label htmlFor="country-filter">Find countries: </label>
    <input
      id="country-filter"
      type="text"
      value={filter}
      onChange={handleFilterChange}
      placeholder="Type country name..."
      style={{ maxWidth: '400px', width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
    />
  </div>
)

export default Filter