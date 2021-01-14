import './App.css';
import React, { useState, useEffect } from 'react';
import StatsBox from './components/StatsBox/StatsBox';
import Map from './components/Map/Map';
import Table from './components/Table/Table';
import Graph from './components/Graph';
import numeral from "numeral";
import 'leaflet/dist/leaflet.css';
import { formattedStat } from './util';

import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core'


const url = 'https://disease.sh/v3/covid-19/countries'

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryStats, setCountryStats] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCoord, setMapCoord] = useState({lat: 34.80746, lng: -40.4796})
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([])
  const [valueType, setValueType] = useState("cases");

// console.log(mapCoord)

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
      setMapCountries(countriesData)
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
      // console.log(countryData.countryInfo.lat)
      setMapCoord([countryData.countryInfo.lat, countryData.countryInfo.long]);
      setMapZoom(4);
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
          <StatsBox  title='Coronavirus Cases' cases={formattedStat(countryStats.todayCases)} total={formattedStat(countryStats.cases)}
          onClick={e => setValueType('cases')}
          active={valueType === 'cases'} />
          <StatsBox title='Recovered' cases={formattedStat(countryStats.todayRecovered)} total={formattedStat(countryStats.recovered)} 
          onClick={e => setValueType('recovered')}
          active={valueType === 'recovered'}
          />
          <StatsBox title='Deaths' cases={formattedStat(countryStats.todayDeaths)} total={formattedStat(countryStats.deaths)}
           onClick={e => setValueType('deaths')}
           active={valueType === 'deaths'}
          />
        </div>
        <Map casesType={valueType} countries={mapCountries} center={mapCoord} zoom={mapZoom} />
      </div>
      <Card className="app__right">
            <CardContent>
              <h3>Live Cases by Country</h3>
              <Table countries={tableData} />
              <h3>Worldwide new {valueType} </h3>
            </CardContent>
            <Graph  casesType={valueType}  />
      </Card>      
    </div>
  );
}

export default App;
