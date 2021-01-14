import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format('+0,0');
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: 'time',
                time: {
                    format: 'MM/DD/YY',
                    tooltipFormat: 'll'
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format('0a');
                    },
                },
            },
        ],
    }

}

    const chartDataAll = (data, casesType='cases') => {
        const chartData = [];
        let previousData;
        for (let date in data.cases) {
            if (previousData) {
                const newData = {
                    x: date,
                    y: data[casesType][date] - previousData
                }
                chartData.push(newData);
            }
            previousData = data[casesType][date]
        };
        return chartData;
    }

const Graph = ({ casesType = 'cases' }) => {
    const [data, setData] = useState({});




    const fetchGraphData = async () => {
        const allUrl = 'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
        try {
          const response = await fetch(allUrl)
          const allData = await response.json()
          let charData = chartDataAll(allData, casesType)
          setData(charData)
        //   console.log(charData)
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(() => {
        fetchGraphData()
    },[casesType])

    return (
        <div>
        {
            data?.length > 0 && (
                <Line
                options={options}
                data={{
                    datasets: [
                        {
                            backgroundColor: "rgba(204, 16, 52, 0.5)",
                            borderColor: '#CC1034',
                            data: data,
                        },
                    ],
                }}

                />
            )
        }
        </div>
    )
}

export default Graph
