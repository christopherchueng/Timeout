import { useCallback, useMemo, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getAlarmlist, updateAlarmlist } from "../../store/alarmlist"
import { getAlarms, updateAlarm } from "../../store/alarm"
import EditAlarmlistForm from "./EditAlarmlistForm"
import DeleteAlarmlistModal from "./DeleteAlarmlistModal"
import Alarm from "../Alarm"
import './AlarmList.css'


const AlarmList = ({ alarmlist }) => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const alarmlists = useSelector(state => state?.alarmlist?.entries)
    const alarms = useSelector(state => Object.values(state?.alarm?.entries))
    const filteredAlarms = useMemo(() => alarms.filter(alarm => alarm?.alarmlistId === alarmlist?.id), [alarms])
    const [name, setName] = useState(0)
    const [mainAlarmlistSwitch, setMainAlarmlistSwitch] = useState('')
    const [openTab, setOpenTab] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [openSettings, setOpenSettings] = useState(false)
    const [showEllipsis, setShowEllipsis] = useState(false)

    useEffect(() => {
        dispatch(getAlarmlist(alarmlist?.id))
        dispatch(getAlarms(alarmlist?.id))
    }, [dispatch])

    useEffect(() => {
        // Sometimes, the page renders at the bottom first,
        // so this will force the page to scroll up on mount
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (
            (alarmlists && Object.values(alarmlists).length !== 0) ||
            (alarmlist && Object.values(alarmlist).length !== 0)
            ) {
            setName(alarmlists[id]?.name || alarmlist?.name)
            setMainAlarmlistSwitch(alarmlists[id]?.toggle || alarmlist?.toggle)
        }
    }, [alarmlist, alarmlists, id])

    const toggleAlarmlist = useCallback(() => {
        const payload = {
            name,
            'toggle': !mainAlarmlistSwitch,
            'id': alarmlist?.id,
        }

        dispatch(updateAlarmlist(payload)).then(
            alarms.forEach(async alarm => {
                let repeatPayload = []

                for (let day of alarm.repeat) {
                    repeatPayload.push(day.id)
                }

                if (alarm.alarmlistId === alarmlist?.id) {
                    const alarmPayload = {
                        'alarm_id': alarm.id,
                        'name': alarm.name,
                        'hour': alarm.hour,
                        'minutes': `${alarm.minutes}`,
                        'meridiem': alarm.meridiem,
                        'sound': alarm.sound,
                        'repeat': `${repeatPayload}`,
                        'snooze': alarm.snooze,
                        'alarmlist_id': alarm.alarmlistId
                    }

                    // If main toggle is ON and is clicked, TURN OFF ALL ALARMS
                    if (mainAlarmlistSwitch === true) {
                        alarmPayload['toggle'] = false

                    // If main toggle is OFF and is clicked, TURN ON ALL ALARMS
                    } else {
                        alarmPayload['toggle'] = true
                    }

                    await dispatch(updateAlarm(alarmPayload))
                }
            })
        )
    }, [dispatch, alarms, mainAlarmlistSwitch])

    return (
        <div className='alarmlist-content'>
            {isEditing
            ?
            <div id='edit-alarmlist-form'>
                <EditAlarmlistForm
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    alarmlist={alarmlist}
                    openSettings={openSettings}
                    setOpenSettings={setOpenSettings}
                />
            </div>
            :
            <div
                className='alarmlist-top'
                style={{
                    transform: openSettings ? 'translateX(-100px)' : '',
                    transition: '0.2s',
                }}
                onMouseEnter={() => setShowEllipsis(true)}
                onMouseLeave={() => setShowEllipsis(false)}
            >
                <div className='alarmlist-header' key={alarmlist?.id}>
                    <div className='alarmlist-name' onClick={() => setOpenTab(prev => !prev)}>
                        <h1
                            className="alarmlist-name-heading"
                            style={{color: alarmlist?.toggle ? 'black' : '#a5a5a5'}}
                        >
                            {alarmlist?.name}
                        </h1>
                        {filteredAlarms.length ? <div className="dropdown-alarm-btn">
                            <button
                                className='toggle-alarms-view'
                                style={{transform: openTab ? 'rotate(90deg)' : '', transition: '0.2s ease-out'}}
                            >
                                <i
                                    className="fa-solid fa-angle-right fa-xl"
                                    style={{color: alarmlist?.toggle ? 'black' : '#a5a5a5'}}
                                ></i>
                            </button>
                        </div> : ''}
                    </div>
                    <div className='toggle-and-settings'>
                        <div
                            className='alarmlist-toggle'
                            style={{paddingRight: alarmlist?.id === 1 ? '35px' : ''}}
                        >
                            <label className='alarmlist-switch'>
                                <input
                                    type='checkbox'
                                    value={mainAlarmlistSwitch}
                                    onChange={toggleAlarmlist}
                                    className='alarmlist-radio-box'
                                    checked={mainAlarmlistSwitch}
                                />
                                <div className='alarmlist-slider alarmlist-ball'>
                                </div>
                            </label>
                        </div>
                        {/* Default alarmlist name (alarmlistId 1) cannot be deleted or edited */}
                        {alarmlist?.id !== 1
                            ?
                            <div
                                className='settings-menu'
                                onClick={() => alarmlist?.id !== 1 && setOpenSettings(!openSettings)}
                            >
                                <div className='alarmlist-toggle-settings'>
                                    {showEllipsis &&
                                    <button className='ellipsis-settings'>
                                        <i className="fa-solid fa-ellipsis-vertical fa-xl"></i>
                                    </button>}
                                </div>
                            </div>
                        : ""}
                    </div>
                </div>
                <div
                    className='alarmlist-btn-settings'
                    style={{
                        transform: openSettings ? 'translateX(-12px)' : '',
                        width: '0',
                        padding: !openSettings && '0'
                    }}
                >
                    {openSettings &&
                    <div className='settings-ctn'>
                        <div className='edit-alarmlist'>
                            <button type='button' className='alarmlist-edit-btn' onClick={() => setIsEditing(!isEditing)}>
                                <span className="edit-alarmlist-label">Edit</span>
                            </button>
                        </div>
                        <div className='delete-alarmlist'>
                            <DeleteAlarmlistModal alarmlist={id ? alarmlists[id] : alarmlist} openSettings={openSettings} setOpenSettings={setOpenSettings} />
                        </div>
                    </div>}
                </div>
            </div>}
            <div id='alarmlist-alarms'>
                {filteredAlarms.length === 0 ?
                <div className='no-alarms-ctn'>
                    <p className='no-alarms'>{`You have no alarms under '${alarmlist?.name}.' Create a new alarm in the top right corner!`}</p>
                </div>
                :
                <div className='dropdown-alarms'>
                    {filteredAlarms && filteredAlarms.map(alarm => (
                        <div className='alarm-toggle-ctn' key={alarm.id}>
                            <Alarm
                                alarm={alarm}
                                openTab={openTab}
                                setOpenTab={setOpenTab}
                                alarmlist={id ? alarmlists[id] : alarmlist}
                                setMainAlarmlistSwitch={setMainAlarmlistSwitch}
                            />
                        </div>))
                    }
                </div>}
            </div>
        </div>
    )
}

export default AlarmList
