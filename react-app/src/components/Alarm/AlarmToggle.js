import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { deleteAlarm } from "../../store/alarm"
import { useToggleContext } from "../../context/ToggleContext"

const AlarmToggle = ({ alarm, id, alarmlist, alarmsArr, mainAlarmlistSwitch, setMainAlarmlistSwitch }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [alarmOn, setAlarmOn] = useState(false)
    // const { alarmlistOn, setAlarmlistOn, alarmOn, setAlarmOn } = useToggleContext()
    // const { alarmlistOn, setAlarmlistOn } = useToggleContext()

    // useEffect(() => {
    //     // Set alarmlist toggle and alarm toggles to state on mount
    //     setAlarmlistOn(alarmlistOn)
    //     setAlarmOn(alarmOn)
    // }, [])
    useEffect(() => {
        if (mainAlarmlistSwitch) {
            setAlarmOn(true)
        } else {
            setAlarmOn(false)
        }

    }, [mainAlarmlistSwitch])

    // useEffect(() => {
    //     // Some conditional stating: If alarmlist toggle is on,
    //     // Then set ALL alarms to on and vice versa.
    //     // Otherwise just let the input checkbox do its thing.
    //     setAlarmOn(!alarmOn)
    // }, [alarmlistOn])

    const onDelete = (e, alarm) => {
        e.preventDefault()
        dispatch(deleteAlarm(alarm.id))
        history.push(`/alarmlists/${id}`)
    }

    // const onClick = () => {
    //     if (alarm?.alarmlistId === alarmlist?.id) {
    //         setAlarmlistOn(!alarmlistOn)
    //     }
    //     // alarmOn ? setAlarmOn(!alarmOn) : setAlarmOn(alarmOn)
    //     // !alarmlistOn ? setAlarmlistOn(alarmlistOn) : setAlarmlistOn(!alarmlistOn)
    // }

    /* ALARM CAN BE ON OR OFF AND SHOULD NOT AFFECT THE ALARMLIST TOGGLE NOR OTHER ALARMS.
    UNLESS YOU ARE TURNING ON THE LAST ALARM IN THE ALARMLIST.
    EX: 9/10 OF THE ALARMS IN THE ALARMLIST ARE ON. IF I TURN ON THE 10TH ALARM,
    THE ALARMLIST TOGGLE SHOULD BE ON BECAUSE NOW ALL ALARMS ARE ON. */
    // const onChange = () => {
    //     let onCount = 0
    //     let selectedAlarms = alarmsArr.filter(alarm => alarmlist?.id === alarm?.alarmlistId)
    //     // if (alarmOn) {
    //     //     onCount -= 1
    //     // }
    //     // if (!alarmOn) {
    //     //     onCount += 1
    //     // }
    //     // for (let alarm of selectedAlarms) {
    //     //     if (onCount === selectedAlarms.length) {
    //     //         setAlarmlistOn(true)
    //     //     }
    //     // }
    // }

    console.log('here is alarmOn', alarmOn)

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
                    value={alarmOn}
                    onClick={() => setAlarmOn(!alarmOn)}
                    className='alarm-radio-box'
                    // checked={alarmOn}
                />
                <div className='alarm-slider alarm-ball'>
                </div>
            </label>
        </>
    )
}

export default AlarmToggle
