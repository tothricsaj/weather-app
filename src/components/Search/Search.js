import React, { useState, useEffect } from 'react'
import {BASE_URL, PROXY_URL} from '../../constants'
import style from './Search.module.css'

const Search = props => {
  const [searchedCity, setSearchedCity] = useState('')
  const [fethcedCityList, setFethcedCityList] = useState([])

  useEffect(() => {
    if(searchedCity) {
      fetch(PROXY_URL + BASE_URL + `/search/?query=` + searchedCity)
        .then(response => response.json())
        .then(data => {
          console.log(data)

          setFethcedCityList(
            data.map(city =>  <li key={city.woeid}>{city.title}</li>)
          )
        })
    }
  }, [searchedCity])

  const searchCityHandler = (city) => {
    console.log(city)
    if(city === '') {
      setSearchedCity('')
      setFethcedCityList([])
    }
    else {
      setSearchedCity(city)
    }
  }

  return (
    <div className={style.Search}>
      <div className={style.closeSearch} onClick={props.closeSearch}>&#10006;</div>
      <div className={style.SearchBox}>
        <input
          type="text"
          onKeyUp={(e) => searchCityHandler(e.target.value)}
        />
        <button>Search</button>
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