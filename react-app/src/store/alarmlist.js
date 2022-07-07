const LOAD_ALARMLISTS = 'alarmlist/LOAD_ALARMLISTS'
const POST_ALARMLIST = 'alarmlist/POST_ALARMLIST'

export const loadAlarmlists = (alarmlists) => {
    return {
        type: LOAD_ALARMLISTS,
        alarmlists
    }
}

export const postAlarmlist = (alarmlist) => {
    return {
        type: POST_ALARMLIST,
        alarmlist
    }
}

export const getAlarmlists = () => async (dispatch) => {
    const response = await fetch('/api/alarmlists/')

    const alarmlists = await response.json()
    dispatch(loadAlarmlists(alarmlists))
}

export const createAlarmlist = payload => async (dispatch) => {
    const response = await fetch('/api/alarmlists/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const alarmlist = await response.json()
        dispatch(postAlarmlist(alarmlist))
        return alarmlist
    }
}

const initialState = { entries: {}, isLoading: true }

const alarmlistReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_ALARMLISTS:
            newState = { ...state, entries: { ...state.entries }}
            action.alarmlists.map(alarmlist => { newState.entries[alarmlist.id] = alarmlist })
            return newState
        case POST_ALARMLIST:
            newState = { ...state, entries: { ... state.entries }}
            newState.entries[action.alarmlist.id] = action.alarmlist
            return newState
        default:
            return state
    }
}

export default alarmlistReducer
