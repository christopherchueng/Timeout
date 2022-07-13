import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { deleteAlarm } from "../../store/alarm"

const AlarmToggle = ({ alarm, id }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [alarmOn, setAlarmOn] = useState(false)


    const onClick = (e, alarm) => {
        e.preventDefault()
        dispatch(deleteAlarm(alarm.id))
        history.push(`/alarmlists/${id}`)
    }

    return (
        <>
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
            <label className='alarm-switch'>
                <input
                    type='checkbox'
                    value={alarmOn}
                    onClick={() => setAlarmOn(!alarmOn)}
                    className='alarm-radio-box'
                    checked={alarmOn}
                />
                <div className='alarm-slider alarm-ball'>
                </div>
            </label>
        </>
    )
}

export default AlarmToggle
