import './App.css';
import React, { useState, useEffect } from 'react';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core'


const url = 'https://disease.sh/v3/covid-19/countries'

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const fetchCountries = async () => {
    try {
      const response = await fetch(url)
      const countriesData = await response.json()
      const countries = countriesData.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }) )
      setCountries(countries);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCountries()
  }, [countries])

  const onCountryChange = async (e) => {
    const countryValue = e.target.value

    setCountry(countryValue)
  }
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>covid 19 tracker</h1>
          <FormControl className='app__dropdown'>
            <Select variant='outlined'
              onChange={onCountryChange}
              value={country}>
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries.map((country) => {
                return (
                <MenuItem value={country.value}>{country.name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title='Coronavirus Cases' cases={1234} total={2000} />
          <InfoBox title='Recovered' cases={1234} total={4000} />
          <InfoBox title='Deaths' cases={1234} total={3000}/>
        </div>
        <Map />
      </div>
      <Card className="app__right">
            <CardContent>
              <h3>Live Cases by Country</h3>
              <h3>Worldwide new cases</h3>
            </CardContent>
      </Card>

      
    </div>
  );
}

export default App;
