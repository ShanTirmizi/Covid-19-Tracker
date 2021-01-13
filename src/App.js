import './App.css';
import React, { useState, useEffect } from 'react';
import StatsBox from './components/StatsBox';
import Map from './components/Map';
import Table from './components/Table/Table';

import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core'


const url = 'https://disease.sh/v3/covid-19/countries'

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryStats, setCountryStats] = useState({});
  const [tableData, setTableData] = useState([]); 


  const fetchCountries = async () => {
    try {
      const response = await fetch(url)
      const countriesData = await response.json()
      const countries = countriesData.map((country) => ({
        id: country.population,
        name: country.country,
        value: country.countryInfo.iso2,
      }) )

      const dataSorted = countriesData.sort((a, b) => b.cases - a.cases)
      setTableData(dataSorted);
      setCountries(countries);
    } catch (error) {
      console.log(error)
    }
  }

  const fetchWorldwide = async () => {
    const allUrl = 'https://disease.sh/v3/covid-19/all'
    try {
      const response = await fetch(allUrl)
      const countryData = await response.json()
      setCountryStats(countryData)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    fetchWorldwide()
  }, [])

  useEffect(() => {
    fetchCountries()
  }, [countries])



  const onCountryChange = async (e) => {
    const countryValue = e.target.value
    const dataUrl = countryValue === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : 
    `https://disease.sh/v3/covid-19/countries/${countryValue}`
    try {
      const response = await fetch(dataUrl)
      const countryData = await response.json()
      // console.log(countryData)
      setCountry(countryValue)
      setCountryStats(countryData)
    } catch (error) {
      console.log(error)
    }

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
                {/* console.log(country) */}
                return (
                <MenuItem key={country.id} value={country.value}>{country.name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <StatsBox title='Coronavirus Cases' cases={countryStats.todayCases} total={countryStats.cases} />
          <StatsBox title='Recovered' cases={countryStats.todayRecovered} total={countryStats.recovered} />
          <StatsBox title='Deaths' cases={countryStats.todayDeaths} total={countryStats.deaths}/>
        </div>
        <Map />
      </div>
      <Card className="app__right">
            <CardContent>
              <h3>Live Cases by Country</h3>
              <Table countries={tableData} />
              <h3>Worldwide new cases</h3>
            </CardContent>
      </Card>

      
    </div>
  );
}

export default App;
