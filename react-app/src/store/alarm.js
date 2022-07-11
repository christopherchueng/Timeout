const LOAD_ONE_ALARM = 'alarm/loadOneAlarm'
const LOAD_ALARMS = 'alarm/loadAlarms'
const LOAD_INDEPENDENT_ALARMS = 'alarm/loadIndependentAlarms'
const ADD_ALARM = 'alarm/addAlarm'
const EDIT_ALARM = 'alarm/editAlarm'
const REMOVE_ALARM = 'alarm/removeAlarm'

export const loadOneAlarm = (alarm) => {
    return {
        type: LOAD_ONE_ALARM,
        alarm
    }
}

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

export const editAlarm = (alarm) => {
    return {
        type: EDIT_ALARM,
        alarm
    }
}

export const removeAlarm = (alarmId) => {
    return {
        type: REMOVE_ALARM,
        alarmId
    }
}

export const getAlarm = (alarm_id) => async (dispatch) => {
    const response = await fetch(`/api/alarms/${alarm_id}`)

    const alarm = await response.json()
    dispatch(loadOneAlarm(alarm))
}

export const getAlarms = (alarmlist_id) => async (dispatch) => {
    const response = await fetch(`/api/alarms/${alarmlist_id}/alarms`)

    const alarms = await response.json()
    dispatch(loadAlarms(alarms))
}

export const getIndependentAlarms = (alarmlist_id) => async (dispatch) => {
    const response = await fetch(`/api/alarms/${alarmlist_id}/alarms`)

    const alarms = await response.json()
    dispatch(loadAlarms(alarms))
}

export const createAlarm = (payload) => async (dispatch) => {
    const response = await fetch('/api/alarms/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const alarm = await response.json()
        dispatch(addAlarm(alarm))
    } else if (response.status < 500) {
        const alarm = await response.json();
        if (alarm.errors) {
            return alarm.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const updateAlarm = (payload) => async (dispatch) => {
    console.log('what is this payload we sending to the backend', payload)
    const response = await fetch(`/api/alarms/${payload.alarmId}/edit`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const alarm = await response.json()
        dispatch(editAlarm(alarm))
    } else if (response.status < 500) {
        const alarm = await response.json();
        if (alarm.errors) {
            return alarm.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const deleteAlarm = (alarmId) => async (dispatch) => {
    const response = await fetch(`/api/alarms/${alarmId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const alarm = await response.json()
        dispatch(removeAlarm(alarmId))
    }
}

const initialState = { entries: {}, independent: {}, isLoading: true }

const alarmReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_ONE_ALARM:
            newState = { ...state, entries: { }}
            newState.entries[action.alarm.id] = action.alarm
            return newState
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
        case EDIT_ALARM:
            newState = { ...state, entries: { ...state.entries }, independent: { ...state.independent }}
            if (action.alarm.alarmlistId === 1) {
                newState.independent[action.alarm.id] = action.alarm
                return newState
            } else {
                newState.entries[action.alarm.id] = action.alarm
            }
            return newState
        case REMOVE_ALARM:
            newState = { ...state, entries: { ...state.entries }, independent: { ...state.independent }}
            if (action.alarmId === 1) {
                delete newState.independent[action.alarmId]
                return newState
            } else {
                delete newState.entries[action.alarmId]
                return newState
            }
        default:
            return state
    }
}

export default alarmReducer
