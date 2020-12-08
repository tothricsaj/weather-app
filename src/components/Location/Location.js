import React, {useState, useEffect } from 'react'
import style from './Location.module.css'

const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const baseUrl = 'https://www.metaweather.com/api/location/'

const Location = props => {
  const [woeId, setWoeId] = useState(null)
  const [weatherData, setWeatherData] = useState('')

  useEffect(() => {
    let url
    navigator.geolocation.getCurrentPosition(pos => {
      console.log(pos.coords.latitude, pos.coords.longitude)

      url = `${baseUrl}search/?lattlong=${pos.coords.latitude},${pos.coords.longitude}`

      fetch(proxyUrl + url)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setWoeId(data[0].woeid)
      }).catch(err => console.log(err))
    })
  }, [])

  useEffect(() => {
    if(woeId) {
      console.log('Fetch the weather datas')
      fetch(proxyUrl + baseUrl + woeId)
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          const today = data.consolidated_weather[0]
          const weatherInfos = {
            imgAbbr: today.weather_state_abbr,
            state: today.weather_state_name,
            date: today.applicable_date,
            temperature: today.the_temp,
            city: data.title,
          }

          console.log(weatherInfos)
          setWeatherData(weatherInfos)
        }).catch(err => console.log(err))
      }
  }, [woeId])

  return (
    <div className={style.location}>
      <div className={style.buttons}>
        <button className={style.search}>Search for places</button>
        <button className={style.search}>Location</button>
      </div>

      <div className={style.weahterImg}>
        <img
          src={`https://www.metaweather.com/static/img/weather/png/64/${weatherData ? weatherData.imgAbbr: 'lc'}.png`}
          alt="Weathe"/>
      </div>

      <div className={style.temerature}>
        <p className={style.tempValue}>{weatherData ? weatherData.temerature : null} C</p>
        <h1>Shower</h1>
      </div>

      <div className={style.date}>
        <p>Today - {weatherData ? weatherData.date : null}</p>
        <p>{weatherData.city}</p>
      </div>
    </div>
  )
}

export default Location