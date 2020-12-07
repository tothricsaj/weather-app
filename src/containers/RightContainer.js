import React from 'react'
import Week from '../components/Week/Week'
import TodayHighlights from '../components/TodayHighlights/TodayHighlights'

const RightContainer = props => {
  return (
    <div>
        <Week />
        <TodayHighlights />
    </div>
  )
}

export default RightContainer
