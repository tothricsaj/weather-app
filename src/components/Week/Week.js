import React from 'react'
import style from './weekStyle.module.css'

const DalyWeatherInfo = props => {
  return (
    <div className={style.dalyWeather}>
      <p>Tomorrow</p>
      <img src="https://www.metaweather.com//static/img/weather/png/64/sn.png" alt=""/>
      <p className={style.dalyTemperature}>11C</p>
      <p className={style.dalyTemperature}>16C</p>
    </div>
  )
}

const Week = props => {
  return (
    <div className={style.weekWrapper}>
        {
          [1,2,3,4,5].map(dalyWeather => <DalyWeatherInfo />)
        }
    </div>
  )
}

export default Week
