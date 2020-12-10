import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import style from './Week.module.css'

const dayNameConverter = date => {
  const dayDate = new Date(date)
  switch(dayDate.getDay()) {
    case 0:
      return 'Sunday'
    case 1:
      return 'Monday'
    case 2:
      return 'Tuesday'
    case 3:
      return 'Wednesday'
    case 4:
      return 'Thursday'
    case 5:
      return 'Friday'
    case 6:
      return 'Saturday'
  }
}

const DalyWeatherInfo = props => {
  return (
    <div className={style.dalyWeather}>
      <p>{dayNameConverter(props.dalyInfo.applicable_date)}</p>
      <img src={`https://www.metaweather.com//static/img/weather/png/64/${props.dalyInfo.weather_state_abbr}.png`} alt=""/>
      <p className={style.dalyTemperature}>{props.dalyInfo.min_temp.toFixed(2)}&#8451;</p>
      <p className={style.dalyTemperature}>{props.dalyInfo.max_temp.toFixed(2)}&#8451;</p>
    </div>
  )
}

const Week = props => {
  const [dalyInfos, setDalyInfos] = useState(null)

  useEffect(() => {
    setDalyInfos(props.week)
  }, [props.week])

  return (
    <div className={style.weekWrapper}>
        {dalyInfos
          ? dalyInfos.map((dalyWeather, i) => <DalyWeatherInfo key={i} dalyInfo={dalyWeather}  />)
          : 'Loading....'
        }
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state.week)
  return {
    week: state.week
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetWeekInfos: () => dispatch()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Week)
