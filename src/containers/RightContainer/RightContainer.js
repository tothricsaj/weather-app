import React from 'react'
import style from './rightContainerStyle.module.css'
import Week from '../../components/Week/Week'
import TodayHighlights from '../../components/TodayHighlights/TodayHighlights'

const RightContainer = props => {
  return (
    <div className={style.rightContainer}>
        <Week />
        <TodayHighlights />
    </div>
  )
}

export default RightContainer
