const LOAD_ALARMLISTS = 'alarmlist/LOAD_ALARMLISTS'

export const loadAlarmlists = (alarmlists) => {
    return {
        type: LOAD_ALARMLISTS,
        alarmlists
    }
}

export const getAlarmlists = () => async (dispatch) => {
    const response = await fetch('/api/alarmlists/')

    const alarmlists = await response.json()
    dispatch(loadAlarmlists(alarmlists))
}

const initialState = { entries: {}, isLoading: true }

export default alarmlistReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_ALARMLISTS:
            newState = { ...state, entries: { ...state.entries }}
            action.alarmlists.map(alarmlist => { newState.entries[alarmlist.id] = alarmlist })
            return newState
        default:
            return state
    }
}
