import React, {useState, useEffect } from 'react'
import { connect } from 'react-redux'
import style from './Location.module.css'

const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const baseUrl = 'https://www.metaweather.com/api/location/'

const Location = props => {
  const [woeId, setWoeId] = useState(null)
  const [weatherData, setWeatherData] = useState('')

  useEffect(() => {
    let url
    navigator.geolocation.getCurrentPosition(pos => {

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
      console.log('Fetching the weather datas')
      fetch(proxyUrl + baseUrl + woeId)
        .then(res => res.json())
        .then(data => {
          props.onTodayInfosSetting(data.consolidated_weather[0], data.title)
          setWeatherData(props.todayInfos)
          // console.log('ths todayInfos is set -> ' + props.todayInfos.city)
          console.log('%cEnd of the fetching....', 'color: orange;')
        }).catch(err => {
          console.log(err)
        })
      }
  }, [woeId])

  return (
    <div className={style.location}>
      <div className={style.buttons}>
        <button className={style.search}>Search for places</button>
        <button className={style.search}>Location</button>
      </div>

      <div className={style.weahterImg}>
        {
          weatherData
              ? <img src={`https://www.metaweather.com/static/img/weather/png/64/${weatherData.imgAbbr}.png`} alt="Weathe"/>
              : 'Loading....'
        }
      </div>

      <div className={style.temerature}>
        <p className={style.tempValue}>{weatherData ? weatherData.temperature : 'Loading....'} C</p>
        <h1>{weatherData ? weatherData.state : 'Loading....'}</h1>
      </div>

      <div className={style.date}>
        <p>Today - {weatherData ? weatherData.date : 'Loading....'}</p>
        <p>{weatherData ? weatherData.city : 'Loading....'}</p>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    todayInfos: state.today
  }
}

const todayInfosSetting = (infos, cityTitle) => {
  return {
    type: 'TODAY',
    weather_state_abbr: infos.weather_state_abbr,
    weather_state_name: infos.weather_state_name,
    applicable_date: infos.applicable_date,
    the_temp: infos.the_temp,
    title: cityTitle,
  }
}

const mapDispatchToState = dispatch => {
  return {
    onTodayInfosSetting: (infos, cityTitle) => dispatch(todayInfosSetting(infos, cityTitle))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Location)