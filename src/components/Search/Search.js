import React, { useState, useEffect } from 'react'
import {BASE_URL, PROXY_URL} from '../../constants'
import style from './Search.module.css'

const Search = props => {
  const [searchedCity, setSearchedCity] = useState('')
  const [fethcedCityList, setFethcedCityList] = useState([])
  const [firstWoeID, setFirstWoeID] = useState('')

  useEffect(() => {
    if(searchedCity) {
      fetch(PROXY_URL + BASE_URL + `/search/?query=` + searchedCity)
        .then(response => response.json())
        .then(data => {
          // console.log(data)

          if(data.length) {
            setFirstWoeID(data[0].woeid)
          }

          setFethcedCityList(
            data.map(city =>  (
              <li
                key={city.woeid}
                onClick={() => settingLocationHandler(city.woeid)}
              >
                  {city.title}
              </li>
            ))
          )
        })
    }
  }, [searchedCity])

  const settingLocationHandler = (cityWoeID) => {
    props.setLocation(cityWoeID)
      clearCityStates()
      props.closeSearch()
  }

  const searchCityHandler = (event) => {

    const city = event.target.value

    if(event.keyCode === 13) {
      settingLocationHandler(firstWoeID)
      return
    }

    if(city === '') {
      clearCityStates()
    }
    else {
      setSearchedCity(city)
    }
  }

  const clearCityStates = () => {
      setSearchedCity('')
      setFethcedCityList([])
  }

  return (
    <div className={style.Search}>
      <div className={style.closeSearch} onClick={props.closeSearch}>&#10006;</div>
      <div className={style.SearchBox}>
        <input
          type="text"
          onKeyDown={(e) => searchCityHandler(e)}
        />
        <button onClick={() => settingLocationHandler(firstWoeID)}>Search</button>
        <div className={style.searchResults}>
          <ul className={style.resultList}>
            {fethcedCityList}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Search