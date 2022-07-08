const LOAD_ALARMLISTS = 'alarmlist/LOAD_ALARMLISTS'
const LOAD_DEFAULT_ALARMLIST = 'alarmlist/LOAD_DEFAULT_ALARMLIST'
const POST_ALARMLIST = 'alarmlist/POST_ALARMLIST'
const EDIT_ALARMLIST = 'alarmlist/EDIT_ALARMLIST'
const REMOVE_ALARMLIST = 'alarmlist/REMOVE_ALARMLIST'

export const loadAlarmlists = (alarmlists) => {
    return {
        type: LOAD_ALARMLISTS,
        alarmlists
    }
}

export const loadDefaultAlarmlist = (alarmlist) => {
    return {
        type: LOAD_DEFAULT_ALARMLIST,
        alarmlist
    }
}

export const postAlarmlist = (alarmlist) => {
    return {
        type: POST_ALARMLIST,
        alarmlist
    }
}

export const editAlarmlist = (alarmlist) => {
    return {
        type: EDIT_ALARMLIST,
        alarmlist
    }
}

export const removeAlarmlist = (alarmlistId) => {
    return {
        type: REMOVE_ALARMLIST,
        alarmlistId
    }
}

export const getAlarmlists = () => async (dispatch) => {
    const response = await fetch('/api/alarmlists/')

    const alarmlists = await response.json()
    dispatch(loadAlarmlists(alarmlists))
}

export const getDefaultAlarmlist = () => async (dispatch) => {
    const response = await fetch('/api/alarmlists/default')

    const alarmlists = await response.json()
    dispatch(loadDefaultAlarmlist(alarmlists))
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

export const updateAlarmlist = payload => async (dispatch) => {
    const response = await fetch(`/api/alarmlists/${payload.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const alarmlist = await response.json()
        dispatch(editAlarmlist(alarmlist))
        return alarmlist
    }
}

export const deleteAlarmlist = (alarmlistId) => async (dispatch) => {
    const response = await fetch(`/api/alarmlists/${alarmlistId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const alarmlist = await response.json()
        dispatch(removeAlarmlist(alarmlistId))
        return alarmlist
    }
}

const initialState = { entries: {}, default: {}, isLoading: true }

const alarmlistReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_ALARMLISTS:
            newState = { ...state, entries: { ...state.entries }, default: { ...state.default }}
            action.alarmlists.forEach(alarmlist => { newState.entries[alarmlist.id] = alarmlist })
            return newState
        case LOAD_DEFAULT_ALARMLIST:
            newState = { ...state, entries: { ...state.entries }, default: { ...state.default }}
            newState.default[action.alarmlist.id] = action.alarmlist
            return newState
        case POST_ALARMLIST:
            newState = { ...state, entries: { ...state.entries }, default: { ...state.default }}
            newState.entries[action.alarmlist.id] = action.alarmlist
            return newState
        case EDIT_ALARMLIST:
            newState = { ...state, entries: { ...state.entries }, default: { ...state.default }}
            newState.entries[action.alarmlist.id] = action.alarmlist
            return newState
        case REMOVE_ALARMLIST:
            newState = { ...state, entries: { ...state.entries }, default: { ...state.default }}
            delete newState.entries[action.alarmlistId]
            return newState
        default:
            return state
    }
}

export default alarmlistReducer
