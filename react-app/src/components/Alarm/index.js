import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAlarms } from "../../store/alarm"
import { useParams, Link } from "react-router-dom"

import './Alarm.css'

const Alarm = ({ alarmlist }) => {
    const dispatch = useDispatch()
    // Only use this id below for when you are on the alarmlists/:id page! DO NOT USE WHEN ON DASHBOARD
    const { id } = useParams()
    const alarmsObj = useSelector(state => state?.alarm?.entries)
    const alarmsArr = Object.values(alarmsObj)

    useEffect(() => {
        dispatch(getAlarms(alarmlist?.id))
    }, [dispatch])

    return (
        <div className='alarm-info'>
            {alarmsObj && alarmsArr.map(alarm => (
                alarmlist.id === alarm.alarmlistId &&
                <>
                    <div key={alarm.id}>
                        <div className='alarm-name'>
                            {alarm.name}
                        </div>
                        <div className='alarm-time'>
                            {alarm.hour}:{alarm.minutes < 10 ? '0' + alarm.minutes : alarm.minutes} {alarm.meridiem}
                        </div>
                    </div>
                    {id ?
                    <div className='alarm-setting-btns'>
                        <div className='alarm-edit-btn'>
                                <Link to={`/alarms/${alarm.id}/edit`}><span className="fa-solid fa-pen"></span></Link>
                        </div>
                        <div className='alarm-delete-btn'>
                            <button type='button'>
                                <span className="fa-solid fa-trash"></span>
                            </button>
                        </div>
                    </div>
                    : ""}
                </>
            ))}

        </div>
    )
}

export default Alarm
