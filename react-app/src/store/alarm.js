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

const initialState = { entries: {}, default: {}, isLoading: true }

const alarmReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_ALARMS:
            newState = { ...state, entries: { ...state.entries }, default: { ...state.default }}
            action.alarms.forEach(alarm => {
                console.log('inside my reducer with alarm', alarm)
                if (alarm.alarmlistId === 1) {
                    { newState.default[alarm.id] = alarm }
                    return newState
                } else {
                    { newState.entries[alarm.id] = alarm }
                    return newState
                }})
        default:
            return state
    }
}

export default alarmReducer
