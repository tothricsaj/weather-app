const initialState = {
    weatherInfos: {}
}

const weatherInfos = (state=initialState, action) => {
    switch(action.type) {
        case 'TODAY':
            return {
                ...weatherInfos,
                today: {
                    imgAbbr: action.weather_state_abbr,
                    state: action.weather_state_name,
                    date: action.applicable_date,
                    temperature: action.the_temp,
                    city: action.title,
                }
            }
    }

    return state
}

export default weatherInfos