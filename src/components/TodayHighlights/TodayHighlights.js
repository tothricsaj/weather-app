import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import style from './TodayHighlights.module.css'

const Highlight = props => {
  
  return (
    <div className={style.hightlight}>
      {props.value
        ? (<div>
            <p>{props.title}</p>
            <h1>{props.value}{props.metric}</h1>
          </div>)
        : 'Loading....'
      }

    </div>
  )
}

const TodayHighlights = props => {
  const [highlights, setHeighlights] = useState(null)
  useEffect(() => {
    setHeighlights(props.highlights)
    }, [props.highlights])

  return (
    <div className={style.todayHighlights}>
        <h3>TodayHighlight's</h3>
        <div className={style.hightlightWrapper}>
          {highlights
            ? <>
              <Highlight
                title="Wind Status"
                value={highlights.windSpeed}
                metric="mph"
              />
              <Highlight
                title="Humanidity"
                value={highlights.humidity}
                metric="%"
            />
              <Highlight
                title="Visibility"
                value={highlights.visibility}
                metric="miles"
              />
              <Highlight
                title="Air Presure"
                value={highlights.visibility}
                metric="mb"
              />
            </>
            : 'Loading...'
          }

        </div>
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state.highlights)
  return {
    highlights: state.highlights
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetHighlightInfos: () => dispatch()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodayHighlights)