import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getAlarmlist } from "../../store/alarmlist"
import { getAlarms } from "../../store/alarm"
import Alarm from "../Alarm"


const AlarmList = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const alarmlistId = parseInt(id)
    const alarmlist = useSelector(state => state?.alarmlist?.entries)
    const alarmsObj = useSelector(state => state?.alarm?.entries)
    const alarmsArr = Object.values(alarmsObj)

    useEffect(() => {
        dispatch(getAlarmlist(alarmlistId))
        dispatch(getAlarms(alarmlistId))
    }, [dispatch])
    return (
        <div id='alarmlists'>
            <div className='alarmlist-header'>
                <h1>{alarmlist[id]?.name}</h1>
            </div>
            <div id='alarmlist-alarms'>
                <Alarm alarmlist={alarmlist[id]} />
            </div>
        </div>
    )
}

export default AlarmList
