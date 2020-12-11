import React, { useState } from 'react'
import style from './LeftContainer.module.css'
import Location from '../../components/Location/Location'
import Search from '../../components/Search/Search'

const LeftContainer = props => {
  const [showSearch, setShowSearch] = useState(false)

  const showSearchHandler = () => {
    setShowSearch(!showSearch)
  }

  return (
    <div className={style.leftContainer}>
        <Location  showSearch={showSearchHandler} />
        {showSearch && <Search />}
    </div>
  )
}

export default LeftContainer
