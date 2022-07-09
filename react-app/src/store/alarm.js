const LOAD_ALARMS = 'alarm/loadAlarms'
const LOAD_INDEPENDENT_ALARMS = 'alarm/loadIndependentAlarms'
const ADD_ALARM = 'alarm/addAlarm'

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

export const addAlarm = (alarm) => {
    return {
        type: ADD_ALARM,
        alarm
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

export const createAlarm = (payload) => async (dispatch) => {
    console.log('here in createaAlarm thunk with payload', payload)
    const response = await fetch('/api/alarms/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const alarm = await response.json()
        dispatch(addAlarm(alarm))
    }
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
                    return newState
                } else {
                    newState.entries[alarm.id] = alarm
                }
            })
            return newState
        case ADD_ALARM:
            newState = { ...state, entries: { ...state.entries }, independent: { ...state.independent }}
            if (action.alarm.alarmlistId === 1) {
                newState.independent[action.alarm.id] = action.alarm
                return newState
            } else {
                newState.entries[action.alarm.id] = action.alarm
            }
            return newState
        default:
            return state
    }
}

export default alarmReducer
