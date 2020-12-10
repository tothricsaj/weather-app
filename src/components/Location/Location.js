import React, {useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions/actionTypes'
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
      props.onTodayInfosSetting(woeId)
      console.log(props.todayInfos)
    }
  }, [woeId])

  useEffect(() => {
    setWeatherData(props.todayInfos)
  }, [props.todayInfos])

  return (
    <div className={style.location}>
      <div className={style.buttons}>
        <button className={style.search}>Search for places</button>
        <button className={style.search}>Location</button>
      </div>

      <div className={style.weahterImg}>
        {
          weatherData
              ? <img src={`https://www.metaweather.com/static/img/weather/png/64/${weatherData.weather_state_abbr}.png`} alt="Weathe"/>
              : 'Loading....'
        }
      </div>

      <div className={style.temerature}>
        <p className={style.tempValue}>{weatherData ? weatherData.the_temp: 'Loading....'} &#8451;</p>
        <h1>{weatherData ? weatherData.weather_state_name : 'Loading....'}</h1>
      </div>

      <div className={style.date}>
        <p>Today - {weatherData ? weatherData.applicable_date: 'Loading....'}</p>
        <p>{weatherData ? weatherData.city : 'Loading....'}</p>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  // console.log("state -> " + JSON.stringify(state.today))
  return {
    todayInfos: state.today
  }
}

const todayInfosSetting = (fetchedToday, fetchedWeek, cityTitle) => {
  return {
    type: actionTypes.WEATHER_INFOS,
    today: fetchedToday,
    week: fetchedWeek,
    city: cityTitle,
  }
}

const fetchTheWeather = woeId => {
  return (dispatch, getState) => {
    fetch(proxyUrl + baseUrl + woeId)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        const today = data.consolidated_weather[0]
        const week = data.consolidated_weather.slice(1,6)
        const city = data.title
        // console.log(week)

        dispatch(todayInfosSetting(today, week, city))

        console.log('%cEnd of the fetching....', 'color: orange;')
      }).catch(err => {
        console.log('%cEnd of the fetching....', 'color: red;')
        throw new Error(err)
      })
  }
}

const mapDispatchToState = dispatch => {
  return {
    onTodayInfosSetting: (woeId) => dispatch(fetchTheWeather(woeId))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Location)