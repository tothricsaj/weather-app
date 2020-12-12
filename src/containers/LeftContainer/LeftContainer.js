import React, { useState, useEffect } from 'react'
import {BASE_URL, PROXY_URL} from '../../constants'
import style from './LeftContainer.module.css'
import Location from '../../components/Location/Location'
import Search from '../../components/Search/Search'

const LeftContainer = props => {
  const [showSearch, setShowSearch] = useState(true)
  const [woeId, setWoeId] = useState(null)

  useEffect(() => {
    let url
    navigator.geolocation.getCurrentPosition(pos => {

      url = `${BASE_URL}search/?lattlong=${pos.coords.latitude},${pos.coords.longitude}`

      fetch(PROXY_URL + url)
      .then(res => res.json())
      .then(data => {
        setWoeId(data[0].woeid)
      }).catch(err => {
        throw new Error(err)
      })
    })
  }, [])

  const showSearchHandler = () => {
    setShowSearch(!showSearch)
  }

  return (
    <div className={style.leftContainer}>
        <Location
          showSearch={showSearchHandler}
          woeId={woeId}
        />
        {
          showSearch
            && <Search
                closeSearch={showSearchHandler}
                setLocation={setWoeId}
              />
        }
    </div>
  )
}

export default LeftContainer
