const Filter = ({ filter, handleFilterChange }) => {
    return (
        <div>
            Find country
            <input value={filter} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter