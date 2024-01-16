import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Languages from './components/Languages'
import Flag from './components/Flag'
import Filter from './components/Filter'

const App = () => {
  const [countryList, setCountryList] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountryList(response.data)
      })
      .catch((error) => {
        console.error('Error fetching country list:', error)
      })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    setSelectedCountry(null)
  }

  const handleShowButtonClick = (country) => {
    setSelectedCountry(country)
  }

  const dataToShow = countryList.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )
  console.log(dataToShow)

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {filter && (
        <div>
          {dataToShow.length > 10 ? (
            <div>Too many countries to show</div>
          ) : dataToShow.length > 1 && dataToShow.length < 10 ? (
            dataToShow.map((country) => (
              <div key={country.name.common}>
                {country.name.common}
                <button onClick={() => handleShowButtonClick(country)}>
                  Show
                </button>
              </div>
            ))
          ) : dataToShow.length === 1 ? (
            <div>
              <h1>{dataToShow[0].name.common}</h1>
              <div>Capital {dataToShow[0].capital}</div>
              <div>Area {dataToShow[0].area}</div>
              <Languages dataToShow={dataToShow[0].languages} />
              <Flag dataToShow={dataToShow[0]} />
            </div>
          ) : null}
        </div>
      )}
      {selectedCountry && (
        <div>
          <h1>{selectedCountry.name.common}</h1>
          <div>Capital {selectedCountry.capital}</div>
          <div>Area {selectedCountry.area}</div>
          <Languages dataToShow={selectedCountry.languages} />
          <Flag dataToShow={selectedCountry} />
        </div>
      )}
    </div>
  )
}

export default App
