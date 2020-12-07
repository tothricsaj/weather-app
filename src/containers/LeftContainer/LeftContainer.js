import React from 'react'
import style from './style.module.css'
import Location from '../../components/Location/Location'

const LeftContainer = props => {
  return (
    <div className={style.leftContainer}>
        <Location />
    </div>
  )
}

export default LeftContainer
