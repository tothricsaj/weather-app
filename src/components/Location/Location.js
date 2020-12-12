import React, {useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchTheWeather } from '../../store/actions/weather'
import style from './Location.module.css'

const Location = props => {
  const [weatherData, setWeatherData] = useState('')
  const [city, setCity] = useState('')

  useEffect(() => {
    if(props.woeId)
      props.onTodayInfosSetting(props.woeId)
  }, [props.woeId])

  useEffect(() => {
    setWeatherData(props.todayInfos)
    setCity(props.city)
  }, [props.todayInfos, props.city])

  return (
    <div className={style.location}>
      <div className={style.buttons}>
        <button
          className={style.search}
          onClick={props.showSearch}
        >
          Search for places
        </button>
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
        <p className={style.tempValue}>{weatherData ? weatherData.the_temp.toFixed(2): 'Loading....'} &#8451;</p>
        <h1>{weatherData ? weatherData.weather_state_name : 'Loading....'}</h1>
      </div>

      <div className={style.date}>
        <p>Today - {weatherData ? weatherData.applicable_date: 'Loading....'}</p>
        <p>{city ? city : 'Loading....'}</p>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    todayInfos: state.today,
    city: state.city
  }
}

const mapDispatchToState = dispatch => {
  return {
    onTodayInfosSetting: (woeId) => dispatch(fetchTheWeather(woeId))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Location)