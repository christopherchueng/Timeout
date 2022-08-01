const LOAD_ONE_ALARM = 'alarm/loadOneAlarm'
const LOAD_ALARMS = 'alarm/loadAlarms'
const LOAD_INDEPENDENT_ALARMS = 'alarm/loadIndependentAlarms'
const ADD_ALARM = 'alarm/addAlarm'
const EDIT_ALARM = 'alarm/editAlarm'
const REMOVE_ALARM = 'alarm/removeAlarm'
const CLEAR_ALARMS = 'alarm/clearAlarms'

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

export const clearAlarms = (alarms) => {
    return {
        type: CLEAR_ALARMS,
        alarms
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
    const {
        name,
        hour,
        minutes,
        meridiem,
        sound,
        repeat,
        snooze,
        toggle,
        alarmlist_id
    } = payload

    console.log('here in create alarm thunk', payload.sound)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('hour', hour)
    formData.append('minutes', minutes)
    formData.append('meridiem', meridiem)
    formData.append('sound', sound)
    formData.append('repeat', repeat)
    formData.append('snooze', snooze)
    formData.append('toggle', toggle)
    formData.append('alarmlist_id', alarmlist_id)

    const response = await fetch('/api/alarms/create', {
        method: 'POST',
        body: formData
    })

    if (response.ok) {
        const alarm = await response.json()
        dispatch(addAlarm(alarm))
    } else if (response.status < 500) {
        const alarm = await response.json();
        return alarm;
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const updateAlarm = (payload) => async (dispatch) => {
    const {
        name,
        hour,
        minutes,
        meridiem,
        sound,
        repeat,
        snooze,
        toggle,
        alarmlist_id
    } = payload

    const formData = new FormData()
    formData.append('name', name)
    formData.append('hour', hour)
    formData.append('minutes', minutes)
    formData.append('meridiem', meridiem)
    formData.append('sound', sound)
    formData.append('repeat', repeat)
    formData.append('snooze', snooze)
    formData.append('toggle', toggle)
    formData.append('alarmlist_id', alarmlist_id)

    const response = await fetch(`/api/alarms/${payload.alarm_id}/edit`, {
        method: 'PUT',
        body: formData
    })

    if (response.ok) {
        const alarm = await response.json()
        dispatch(editAlarm(alarm))
    } else if (response.status < 500) {
        const alarm = await response.json();
        return alarm;
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

export const clearAllAlarms = () => async (dispatch) => {
    dispatch(clearAlarms())
    return {}
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
                newState.entries[alarm.id] = alarm
            })
            return newState
        case ADD_ALARM:
            newState = { ...state, entries: { ...state.entries }, independent: { ...state.independent }}
            newState.entries[action.alarm.id] = action.alarm
            return newState
        case EDIT_ALARM:
            newState = { ...state, entries: { ...state.entries }, independent: { ...state.independent }}
            newState.entries[action.alarm.id] = action.alarm
            return newState
        case REMOVE_ALARM:
            newState = { ...state, entries: { ...state.entries }, independent: { ...state.independent }}
            delete newState.entries[action.alarmId]
            return newState
        case CLEAR_ALARMS:
            return { entries: {}, isLoading: true }
        default:
            return state
    }
}

export default alarmReducer
