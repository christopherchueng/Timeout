const LOAD_ALARMS = 'alarm/loadAlarms'

export const loadAlarms = (alarms) => {
    return {
        type: LOAD_ALARMS,
        alarms
    }
}

export const getAlarms = (id) => async (dispatch) => {
    const response = await fetch(`/api/alarms/${id}/alarms`)

    const alarms = await response.json()
    dispatch(loadAlarms(alarms))
}

const initialState = { entries: {}, isLoading: true }

const alarmReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_ALARMS:
            newState = { ...state, entries: { ...state.entries }}
            action.alarms.forEach(alarm => { newState.entries[alarm.id] = alarm })
            return newState
        default:
            return state
    }
}

export default alarmReducer
