import React from 'react'
import style from './Location.module.css'

const Location = props => {
  return (
    <div className={style.location}>
      <div className={style.buttons}>
        <button className={style.search}>Search for places</button>
        <button className={style.search}>Location</button>
      </div>

      <div className={style.weahterImg}>
        <img src="https://www.metaweather.com/static/img/weather/png/64/lc.png" alt="Weathe"/>
      </div>

      <div className={style.temerature}>
        <p className={style.tempValue}>15 C</p>
        <h1>Shower</h1>
      </div>

      <div className={style.date}>
        <p>Today - Fri 5 Jun</p>
        <p>Helsinki</p>
      </div>
    </div>
  )
}

export default Location