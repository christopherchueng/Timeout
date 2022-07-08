import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAlarms } from "../../store/alarm"
import './Alarm.css'

const Alarm = ({ alarmlist }) => {
    const dispatch = useDispatch()
    const alarmsObj = useSelector(state => state?.alarm?.entries)
    const alarmsArr = Object.values(alarmsObj)

    useEffect(() => {
        dispatch(getAlarms(alarmlist?.id))
    }, [dispatch])

    return (
        <div>
            {alarmsObj && alarmsArr.map(alarm => (
                alarmlist.id === alarm.alarmlistId &&
                <div key={alarm.id}>
                    <div className='alarm-name'>
                        {alarm.name}
                    </div>
                    <div className='alarm-time'>
                        {alarm.hour}:{alarm.minutes < 10 ? '0' + alarm.minutes : alarm.minutes} {alarm.meridiem}
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Alarm
