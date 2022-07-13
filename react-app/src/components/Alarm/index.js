import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAlarms } from "../../store/alarm"
import { useParams, Link, useHistory } from "react-router-dom"
import { deleteAlarm } from "../../store/alarm"
import AlarmlistToggle from "../AlarmList/AlarmlistToggle/AlarmlistToggle"
import AlarmToggle from "./AlarmToggle"

import './Alarm.css'

const Alarm = ({ alarmlist, alarmOn, setAlarmOn }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    // Only use this id below for when you are on the alarmlists/:id page! DO NOT USE WHEN ON DASHBOARD
    const { id } = useParams()
    const alarmsObj = useSelector(state => state?.alarm?.entries)
    const alarmsArr = Object.values(alarmsObj)

    useEffect(() => {
        // Need the or statement here because Alarm is used in alarmlist/:id AND dashboard
        // parseInt(id) will be used for when user is on the alarmlist page
        // alarmlist?.id is used for dashboard because parseInt(id) will be rendered as NaN.
        dispatch(getAlarms(parseInt(id) || alarmlist?.id))
    }, [dispatch])

    const onClick = (e, alarm) => {
        e.preventDefault()
        dispatch(deleteAlarm(alarm.id))
        history.push(`/alarmlists/${id}`)
    }

    return (
        <div className='alarm-info'>
            {alarmsArr && alarmsArr.map(alarm => (
                alarm.alarmlistId === alarmlist?.id &&
                <div key={alarm.id}>
                    <div>
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
                                <Link to={`/alarms/${alarm?.id}/edit`}><span className="fa-solid fa-pen"></span></Link>
                        </div>
                        <div className='alarm-delete-btn'>
                            <button type='button' onClick={e => onClick(e, alarm)}>
                                <span className="fa-solid fa-trash"></span>
                            </button>
                        </div>
                    </div>
                    : ""}
                    <div className='alarm-toggle-ctn'>
                        <AlarmToggle alarmOn={alarmOn} setAlarmOn={setAlarmOn} />
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Alarm
