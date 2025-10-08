const Filter = ({ filter, handleFilterChange }) => (
  <div>
        <label>Filter names: </label>
        <input
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
)

export default Filter