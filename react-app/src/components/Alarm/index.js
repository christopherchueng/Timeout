import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link, useHistory } from "react-router-dom"
import { deleteAlarm } from "../../store/alarm"
import { useTimeContext } from "../../context/TimeContext"
import { updateAlarm } from "../../store/alarm"
import { updateAlarmlist } from "../../store/alarmlist"
import SnoozeModal from "../Snooze"
import './Alarm.css'
import DisplayDays from "./DisplayDays"

const Alarm = ({ alarm, openTab, setOpenTab, alarmlist, alarmsArr, mainAlarmlistSwitch, setMainAlarmlistSwitch }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    // Only use this id below for when you are on the alarmlists/:id page! DO NOT USE WHEN ON DASHBOARD
    const { id } = useParams()
    // const alarmsObj = useSelector(state => state?.alarm?.entries)
    // const alarmsArr = Object.values(alarmsObj)
    const initialTimer = () => Number(window.localStorage.getItem('snooze'))

    const { currentTime, hour, minutes, seconds, meridiem } = useTimeContext()
    const [name, setName] = useState('')
    const [alarmHour, setAlarmHour] = useState('')
    const [alarmMinutes, setAlarmMinutes] = useState('')
    const [alarmMeridiem, setAlarmMeridiem] = useState('')
    const [sound, setSound] = useState('')
    const [repeat, setRepeat] = useState('')
    const [snooze, setSnooze] = useState('')
    const [alarmOn, setAlarmOn] = useState('')
    const [alarmlistId, setAlarmlistId] = useState('')
    const [showSnoozeModal, setShowSnoozeModal] = useState(false)
    const [snoozeOn, setSnoozeOn] = useState(false)
    const [countdown, setCountdown] = useState(initialTimer)

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
        setAlarmOn(alarm?.toggle)
    }, [alarm?.toggle, alarmlist, id])

    // useEffect(() => {
    //     if (mainAlarmlistSwitch) {
    //         setAlarmOn(true)
    //     } else {
    //         setAlarmOn(false)
    //     }

    // }, [mainAlarmlistSwitch])

    useEffect(async () => {
        if (alarm.repeat.length !== 0) {
            for (let day of alarm.repeat) {
                // console.log('Do these match?', day.short)
                // If alarm time matches with currentTime, date and toggle is on, then alert.
                if (alarm.hour === (parseInt(currentTime.toLocaleTimeString('en-US', {hour12: false, hour: 'numeric'})) % 12 || 12) &&
                    alarm.minutes === parseInt(currentTime.toLocaleTimeString('en-US', {hour12: true, minute: 'numeric'})) &&
                    alarm.meridiem === (currentTime.toLocaleTimeString('en-US', {hour12: false, hour: 'numeric'}) >= 12 && currentTime.toLocaleTimeString('en-US', {hour12: false, hour: 'numeric'}) <= 23 ? 'PM' : 'AM') &&
                    day.short === currentTime.toLocaleTimeString('en-US', {weekday: 'short'}).split(' ')[0] &&
                    parseInt((currentTime.toLocaleDateString('en-US', {second: 'numeric'})).split(',')[1]) < 2 &&
                    alarm.toggle === true) {
                    // alarm.minutes < 10 ? alert(`${alarm.name} ${alarm.hour}:0${alarm.minutes} ${alarm.meridiem}`) : alert(`${alarm.name} ${alarm.hour}:${alarm.minutes} ${alarm.meridiem}`)
                    setShowSnoozeModal(true);
                }
            }
        } else {
            // These are for non repeated alarms.
            // If alarm time matches with currentTime and toggle is on, then alert.
            if (alarm.hour === (parseInt(currentTime.toLocaleTimeString('en-US', {hour12: false, hour: 'numeric'})) % 12 || 12) &&
                alarm.minutes == parseInt(currentTime.toLocaleTimeString('en-US', {hour12: true, minute: 'numeric'})) &&
                alarm.meridiem === (currentTime.toLocaleTimeString('en-US', {hour12: false, hour: 'numeric'}) >= 12 && currentTime.toLocaleTimeString('en-US', {hour12: false, hour: 'numeric'}) <= 23 ? 'PM' : 'AM') &&
                parseInt((currentTime.toLocaleDateString('en-US', {second: 'numeric'})).split(',')[1]) === 0 &&
                alarm.toggle === true) {
                    setShowSnoozeModal(true);
                    setAlarmOn(!alarmOn)
                    let repeatPayload = []
                    for (let day of repeat) {
                        repeatPayload.push(day.id)
                    }

                    const payload = {
                        'alarm_id': alarm?.id,
                        name,
                        'hour': alarmHour,
                        'minutes': `${alarmMinutes}`,
                        'meridiem': alarmMeridiem,
                        sound,
                        'repeat': `${repeatPayload}`,
                        snooze,
                        'toggle': false,
                        'alarmlist_id': alarm?.alarmlistId
                    }

                    await dispatch(updateAlarm(payload))
                    // alarm.minutes < 10 ? alert(`${alarm.name} ${alarm.hour}:0${alarm.minutes} ${alarm.meridiem}`) : alert(`${alarm.name} ${alarm.hour}:${alarm.minutes} ${alarm.meridiem}`)
            }
        }
    }, [currentTime, alarm])

    useEffect(() => {
        // If snooze is clicked and turned on, then start the snooze countdown
        if (snoozeOn) {
            // This updates the countdown in local storage every second
            const timer = setInterval(() => setCountdown(prev => {
                if (prev > 0) {
                    setCountdown(prev - 1)
                    window.localStorage.setItem('snooze', countdown)
                } else if (countdown <= 0) {
                    // If countdown hits 0, then show the snooze modal.
                    setShowSnoozeModal(true)
                    setSnoozeOn(false)
                }
            }), 1000)
            return () => clearInterval(timer)
        }
    }, [countdown, seconds])

    const onChange = async (e) => {
        e.preventDefault()
        setAlarmOn(!alarmOn)
        let repeatPayload = []
        for (let day of repeat) {
            repeatPayload.push(day.id)
        }

        const payload = {
            'alarm_id': alarm?.id,
            name,
            'hour': alarmHour,
            'minutes': `${alarmMinutes}`,
            'meridiem': alarmMeridiem,
            sound,
            'repeat': `${repeatPayload}`,
            snooze,
            'toggle': !alarmOn,
            'alarmlist_id': alarm?.alarmlistId
        }

        await dispatch(updateAlarm(payload))
    }

    const onDelete = (e, alarm) => {
        e.preventDefault()
        dispatch(deleteAlarm(alarm.id))
        history.push(`/dashboard`)
    }

    return (
        <>
            {openTab ?
                <div className='hidden-alarm-toggle-ctn'>
                    <div className='alarm-content'>
                        <div className='alarm-content-ctn'>
                            <div className='alarm-time'>
                                {alarm?.hour}:{alarm?.minutes < 10 ? '0' + alarm?.minutes : alarm?.minutes}
                                <div className='alarm-meridiem'>
                                    {alarm?.meridiem}
                                </div>
                            </div>
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
                        </div>
                        {/* {id ? */}
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
                        {/* : ""} */}
                    </div>
                    <label className='alarm-switch'>
                        <input
                            type='checkbox'
                            value={alarmOn}
                            onChange={onChange}
                            className='alarm-radio-box'
                            checked={alarmOn}
                        />
                        <div className='alarm-slider alarm-ball'>
                        </div>
                    </label>
                </div>
            : ""}
            {showSnoozeModal ? <SnoozeModal
                alarm={alarm}
                alarmOn={alarmOn}
                setAlarmOn={setAlarmOn}
                countdown={countdown}
                setCountdown={setCountdown}
                snoozeOn={snoozeOn}
                setSnoozeOn={setSnoozeOn}
                showSnoozeModal={showSnoozeModal}
                setShowSnoozeModal={setShowSnoozeModal}
            /> : ''}
        </>
    )
}

export default Alarm
