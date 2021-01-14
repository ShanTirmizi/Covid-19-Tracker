import React from 'react';
import './Table.css';
import numeral from 'numeral'

const Table = ({countries}) => {
    // console.log(countries)
    return (
        <div className='table'>
            {
                countries.map(({country, cases, countryInfo}) => {
                    return (
                        <tr>
                            <td>{country}</td>
                            <td><strong>{numeral(cases).format("0,0")}</strong></td>
                        </tr>
                    )
                })
            }
        </div>
    )
}

export default Table