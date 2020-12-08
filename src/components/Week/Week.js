import React from 'react'

const DalyWeatherInfo = props => {
  return (
    <div>
      <p>Tomorrow</p>
      <img src="https://www.metaweather.com//static/img/weather/png/64/sn.png" alt=""/>
      <p>16 C</p>
      <p>11 C</p>
    </div>
  )
}

const Week = props => {
  return (
    <div>
        {
          [1,2,3,4,5].map(dalyWeather => <DalyWeatherInfo />)
        }
    </div>
  )
}

export default Week
