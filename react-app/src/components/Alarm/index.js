import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link, useHistory } from "react-router-dom"
import { deleteAlarm } from "../../store/alarm"
import { useTimeContext } from "../../context/TimeContext"
import { updateAlarm } from "../../store/alarm"
import './Alarm.css'
import DisplayDays from "./DisplayDays"

const Alarm = ({ alarm, openTab, setOpenTab, alarmlist, mainAlarmlistSwitch, setMainAlarmlistSwitch }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    // Only use this id below for when you are on the alarmlists/:id page! DO NOT USE WHEN ON DASHBOARD
    const { id } = useParams()
    // const alarmsObj = useSelector(state => state?.alarm?.entries)
    // const alarmsArr = Object.values(alarmsObj)

    const { currentTime, hour, minutes, seconds, meridiem } = useTimeContext()
    const [name, setName] = useState(alarm?.name)
    const [alarmHour, setAlarmHour] = useState(alarm?.hour)
    const [alarmMinutes, setAlarmMinutes] = useState(alarm?.minutes)
    const [alarmMeridiem, setAlarmMeridiem] = useState(alarm?.meridiem)
    const [sound, setSound] = useState(alarm?.sound)
    const [repeat, setRepeat] = useState(alarm?.repeat)
    const [snooze, setSnooze] = useState(alarm?.snooze)
    const [alarmOn, setAlarmOn] = useState(alarm?.toggle)
    const [alarmlistId, setAlarmlistId] = useState(alarm?.alarmlistId)


    useEffect(() => {
        // If alarmlist is default, display all alarms.
        // Otherwise, if on the alarmlist/:id page, always display the alarms.
        // For all other cases, don't show alarms
        alarmlist?.id === 1 ? setOpenTab(true) : (id ? setOpenTab(true) : setOpenTab(false))

        setMainAlarmlistSwitch(alarmlist?.toggle)
    }, [])

    useEffect(() => {
        setName(alarm?.name)
        setAlarmHour(alarm?.hour)
        setAlarmMinutes(alarm?.minutes)
        setAlarmMeridiem(alarm?.meridiem)
        setSound(alarm?.sound)
        setSnooze(alarm?.snooze)
        setRepeat(alarm?.repeat)
        setAlarmlistId(alarm?.alarmlistId)
    }, [alarm, alarm?.toggle])

    useEffect(() => {
        if (mainAlarmlistSwitch) {
            setAlarmOn(true)
        } else {
            setAlarmOn(false)
        }

    }, [mainAlarmlistSwitch])

    useEffect(() => {
        if (alarm.repeat.length !== 0) {
            for (let day of alarm.repeat) {
                if (alarm.hour === hour &&
                    alarm.minutes == minutes &&
                    alarm.meridiem === meridiem &&
                    day.id === currentTime.getDay() &&
                    currentTime.getSeconds() === 0 &&
                    alarm.toggle === true) {
                    alert('TESTING THIS!')
                }
            }
        } else {
            if (alarm.hour === hour &&
                alarm.minutes == minutes &&
                alarm.meridiem === meridiem &&
                currentTime.getSeconds() === 0 &&
                alarm.toggle === true) {
                alert(`Alarm at ${alarm.hour}:${alarm.minutes} ${alarm.meridiem} went off!`)
            }
        }
    }, [hour, minutes, meridiem])

    const onChange = async (e) => {
        let repeatPayload = []
        e.preventDefault()
        setAlarmOn(!alarmOn)
        for (let day of alarm?.repeat) {
            repeatPayload.push(day.id)
        }

        const payload = {
            'alarmId': alarm?.id,
            'name': alarm?.name,
            'hour': alarm?.hour,
            'minutes': alarm?.minutes,
            'meridiem': alarm?.meridiem,
            'sound': alarm?.sound,
            'repeat': `${repeatPayload}`,
            'snooze': alarm?.snooze,
            'toggle': !alarmOn,
            'alarmlist_id': alarm?.alarmlistId
        }

        await dispatch(updateAlarm(payload))

    }

    // {alarmlistId: 3
        // hour: 11
        // id: 9
        // meridiem: "AM"
        // minutes: 0
        // name: "Check in"
        // repeat: [
        //     {id: 1, name: 'Monday'}
        //     {id: 2, name: 'Tuesday'}
        //     {id: 3, name: 'Wednesday'}
        //     {id: 4, name: 'Thursday'}
        //     {id: 5, name: 'Friday'}
        // }
        // snooze: false
        // sound: null
    // }

    // useEffect(() => {
    //     // Need the or statement here because Alarm is used in alarmlist/:id AND dashboard
    //     // parseInt(id) will be used for when user is on the alarmlist page
    //     // alarmlist?.id is used for dashboard because parseInt(id) will be rendered as NaN.
    //     dispatch(getAlarms(parseInt(id) || alarmlist?.id))
    // }, [dispatch])

    const onDelete = (e, alarm) => {
        e.preventDefault()
        dispatch(deleteAlarm(alarm.id))
        history.push(`/alarmlists/${id}`)
    }

    return (
        <div className="toggle-alarms">
            {openTab ?
                <div id='dashboard-alarms'>
                    <div className='alarm-info'>
                        <div className='alarm-toggle-ctn'>
                            <div className='alarm-content'>
                                <div className='alarm-name'>
                                    {alarm?.name}{alarm.repeat.length === 0 ? '' : `,`}
                                </div>
                                <div className='alarm-days'>
                                    {alarm.repeat.length === 0 ?
                                    ""
                                    :
                                    <DisplayDays alarmDays={alarm.repeat} />
                                    }
                                </div>
                                <div className='alarm-time'>
                                    {alarm?.hour}:{alarm?.minutes < 10 ? '0' + alarm?.minutes : alarm?.minutes} {alarm?.meridiem}
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
                                    onChange={(e) => onChange(e)}
                                    className='alarm-radio-box'
                                    checked={alarmOn}
                                />
                                <div className='alarm-slider alarm-ball'>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            : ""}
        </div>
    )
}

export default Alarm
