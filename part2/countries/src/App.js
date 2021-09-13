import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CountryInfo from './components/CountryInfo'
import Weather from './components/Weather'

const App = () => {
  const [ countryData, setCountryData ] = useState()
  const [ selectedCountry, setSelectedCountry ] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('Country data fetched successfully')
        setCountryData(response.data)
      })
  }, [])
  
  const handleChange = (event) => {
    if (event.target.value) {
      const filteredCountries = countryData.filter(country => country.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)
      setSelectedCountry(filteredCountries)
    } else {
      setSelectedCountry('')
    }
  }

  const displayData = () => {
    if (selectedCountry.length === 0) {
      return null
    } else if (selectedCountry.length === 1) {
      return (
        <div>
          <CountryInfo selectedCountry={selectedCountry} />
          <Weather capital={selectedCountry[0].capital} />
        </div>
      )
    } else if (selectedCountry.length < 10) {
      return (
        <div>
          {selectedCountry.map((country) =>
          <div key={country.name}>
            {country.name}
            <button onClick={() => {
              setSelectedCountry([country])
            }  
            }>show</button>
          </div>)}
        </div>
      )
    } else if (selectedCountry.length > 10) {
      return <div>Too many matches, specify another filter</div>
    }
  }

  return (
    <div>
      find countries <input onChange={handleChange}></input>
      {displayData()}
    </div>
  )
}

export default App