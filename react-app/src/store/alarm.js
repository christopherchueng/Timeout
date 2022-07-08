const LOAD_ALARMS = 'alarm/loadAlarms'
const LOAD_INDEPENDENT_ALARMS = 'alarm/loadIndependentAlarms'

export const loadAlarms = (alarms) => {
    return {
        type: LOAD_ALARMS,
        alarms
    }
}

export const loadIndependentAlarms = (alarms) => {
    return {
        type: LOAD_INDEPENDENT_ALARMS,
        alarms
    }
}

export const getAlarms = (id) => async (dispatch) => {
    const response = await fetch(`/api/alarms/${id}/alarms`)

    const alarms = await response.json()
    dispatch(loadAlarms(alarms))
}

export const getIndependentAlarms = (id) => async (dispatch) => {
    const response = await fetch(`/api/alarms/${id}/alarms`)

    const alarms = await response.json()
    dispatch(loadAlarms(alarms))
}

const initialState = { entries: {}, independent: {}, isLoading: true }

const alarmReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_ALARMS:
            newState = { ...state, entries: { ...state.entries }, independent: { ...state.independent }}
            action.alarms.forEach(alarm => {
                if (alarm.alarmlistId === 1) {
                    newState.independent[alarm.id] = alarm
                    console.log('inside reducer for independet allarms', newState.independent)
                    return newState
                } else {
                    newState.entries[alarm.id] = alarm
                }
            })
            return newState
        default:
            return state
    }
}

export default alarmReducer
