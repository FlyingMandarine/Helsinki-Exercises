import React from 'react'

const CountryInfo = ({ selectedCountry }) => {
    
    return (
        <div>
          <h1>{selectedCountry[0].name}</h1>

          capital {selectedCountry[0].capital}<br></br>
          population {selectedCountry[0].population}

          <h2>Spoken languages</h2>
          <ul>
            {selectedCountry[0].languages.map((language) => <li key={language.name}>{language.name}</li>)}
          </ul>
          <img src={selectedCountry[0].flag} width="125" height="125" alt="Country's flag"></img>
        </div>
    )
}

export default CountryInfo