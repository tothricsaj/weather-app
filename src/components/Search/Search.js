import React, { useState, useEffect } from 'react'
import {BASE_URL, PROXY_URL} from '../../constants'
import style from './Search.module.css'

const Search = props => {
  const [searchedCity, setSearchedCity] = useState('')
  const [fethcedCityList, setFethcedCityList] = useState([])
  const [firstCity, setFirstCity] = useState({})

  useEffect(() => {
    if(searchedCity) {
      fetch(PROXY_URL + BASE_URL + `/search/?query=` + searchedCity)
        .then(response => response.json())
        .then(data => {
          // console.log(data)

          if(data.length) {
            setFirstCity({
              title: data[0].title,
              woeId: data[0].woeid
            })
          }

          setFethcedCityList(
            data.map(city =>  {
              const cityObj = {
                title: city.title,
                woeId: city.woeid
              }

              return (
                <li
                  key={city.woeid}
                  onClick={() => settingLocationHandler(cityObj)}
                >
                    {city.title}
                </li>
              )
            })
          )
        })
    }
  }, [searchedCity])

  const settingLocationHandler = (cityObj) => {
    props.setLocation(cityObj.woeId)
      clearCityStates()
      props.closeSearch()

      saveCitys(cityObj.title, cityObj.woeId)
  }

  const searchCityHandler = (event) => {

    const city = event.target.value

    if(event.keyCode === 13) {
      settingLocationHandler(firstCity)
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

  const saveCitys = (cityTitle, cityWoeID) => {
    const LS_KEY = 'savedCitys'
    let savedCitys = JSON.parse(localStorage.getItem(LS_KEY))

    // console.log(cityTitle, cityWoeID)

    if(!savedCitys) {
      savedCitys = {}
      console.log('First time')
    } 

    savedCitys[cityTitle] = cityWoeID

    console.log(savedCitys)

    localStorage.setItem(LS_KEY, JSON.stringify(savedCitys))

  }

  return (
    <div className={style.Search}>
      <div className={style.closeSearch} onClick={props.closeSearch}>&#10006;</div>
      <div className={style.SearchBox}>
        <input
          type="text"
          onKeyDown={(e) => searchCityHandler(e)}
        />
        <button onClick={() => settingLocationHandler(firstCity)}>Search</button>
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