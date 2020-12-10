import * as actionTypes from '../actions/actionTypes'

const initialState = {
    weatherInfos: {}
}

const weatherInfos = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.WEATHER_INFOS:
            return {
                ...weatherInfos,
                today: action.today,
                city: action.city
            }
    }

    return state
}

export default weatherInfos