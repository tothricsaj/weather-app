import React from 'react'
import style from './TodayHighlights.module.css'

const Highlight = props => {
  return (
    <div className={style.hightlight}>
      <p>{props.title}</p>
      <h1>{props.value}{props.metric}</h1>
    </div>
  )
}

const TodayHighlights = props => {
  return (
    <div className={style.todayHighlights}>
        <h3>TodayHighlight's</h3>
        <div className={style.hightlightWrapper}>
          <Highlight
            title="Wind Statue"
            value="7" 
            metric="mph"
          />
          <Highlight
            title="Humanidity"
            value="87"
            metric="%"
        />
          <Highlight
            title="Visibility"
            value="6.7"
            metric="miles"
          />
          <Highlight
            title="Air Presure"
            value="998"
            metric="mb"
          />
        </div>

    </div>
  )
}

export default TodayHighlights
