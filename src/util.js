import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';



const typeColors = {
    cases: {
        hex: '#CC1034',
        multiplier: 500,
    },
    recovered: {
        hex: '#7dd71d',
        multiplier: 500,
    },
    deaths: {
        hex: '#fb4443',
        multiplier: 2000,
    },
};

const circleDataOnMap = (data, casesType = "cases") => 
    data.map(country => (
        <Circle 
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={typeColors[casesType].hex}
        fillColor={typeColors[casesType].hex}
        radius={
            Math.sqrt(country[casesType]) * typeColors[casesType].multiplier
        }
        >
            <Popup>
                <div className='popup-container'>
                    <div className='popup-flag' style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
                    <div className='popup-name'>{country.country}</div>
                    <div className='popup-confirmed'>Cases: {numeral(country.cases).format('0,0')}</div>
                    <div className='popup-recovered'>Recovered: {numeral(country.recovered).format('0,0')}</div>
                    <div className='popup-deaths'>Deaths: {numeral(country.deaths).format('0,0')}</div>
                </div>
            </Popup>
        </Circle>
    ))
    
const formattedStat = (stat) =>   stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export {circleDataOnMap}
export {formattedStat}