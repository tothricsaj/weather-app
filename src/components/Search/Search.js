import React from 'react'
import style from './Search.module.css'

const Search = props => {
    return (
        <div className={style.Search}>
            <div className={style.closeSearch} onClick={props.closeSearch}>&#10006;</div>
            <div className={style.SearchBox}>
                <input type="text"/>
                <button>Search</button>
            </div>
        </div>
    )
}

export default Search