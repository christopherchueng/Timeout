import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { deleteAlarm } from "../../store/alarm"

const AlarmToggle = ({ alarm, id, alarmlistOn, setAlarmlistOn }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [alarmOn, setAlarmOn] = useState(false)


    const onDelete = (e, alarm) => {
        e.preventDefault()
        dispatch(deleteAlarm(alarm.id))
        history.push(`/alarmlists/${id}`)
    }

    const onClick = () => {
        alarmOn ? setAlarmOn(!alarmOn) : setAlarmOn(alarmOn)
        !alarmlistOn ? setAlarmlistOn(alarmlistOn) : setAlarmlistOn(!alarmlistOn)
    }

    console.log('what is alarmOn', alarmOn)
    console.log('what is alarmlistOn', alarmlistOn)

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
                    <button type='button' onClick={e => onDelete(e, alarm)}>
                        <span className="fa-solid fa-trash"></span>
                    </button>
                </div>
            </div>
            : ""}
            <label className='alarm-switch'>
                <input
                    type='checkbox'
                    // value={alarmOn}
                    onClick={onClick}
                    className='alarm-radio-box'
                    checked={alarmOn || alarmlistOn}
                />
                <div className='alarm-slider alarm-ball'>
                </div>
            </label>
        </>
    )
}

export default AlarmToggle
