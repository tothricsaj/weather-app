import * as actionTypes from '../../store/actions/actionTypes'
import {BASE_URL, PROXY_URL} from '../../constants'

const weatherInfosSetting = (fetchedToday, fetchedWeek, fetchedHighlights, cityTitle) => {
  return {
    type: actionTypes.WEATHER_INFOS,
    today: fetchedToday,
    week: fetchedWeek,
    highlights: fetchedHighlights,
    city: cityTitle,
  }
}

export const fetchTheWeather = woeId => {
  return (dispatch, getState) => {
    fetch(PROXY_URL + BASE_URL + woeId)
      .then(res => res.json())
      .then(data => {
        const today = data.consolidated_weather[0]
        const week = data.consolidated_weather.slice(1,6)
        const city = data.title
        const highlights = {
          windSpeed: today.wind_speed.toFixed(2),
          humidity: today.humidity,
          visibility: today.visibility.toFixed(2),
          airPressure: today.air_pressure.toFixed(2)
        }

        dispatch(weatherInfosSetting(today, week, highlights, city))

      }).catch(err => {
        throw new Error(err)
      })
  }
}