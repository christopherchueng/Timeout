import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAlarmlists } from "../../store/alarmlist"

const AlarmList = () => {
    const dispatch = useDispatch()
    const alarmlists = useSelector(state => state?.alarmlists?.entries)

    useEffect(() => {
        dispatch(getAlarmlists())
    }, [dispatch])

    return (
        <>
            <h1>Here is the alarm list!</h1>
        </>
    )
}

export default AlarmList
