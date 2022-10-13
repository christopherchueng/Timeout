import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import { getAlarmlist, updateAlarmlist } from "../../store/alarmlist"
import { getAlarms, updateAlarm } from "../../store/alarm"
import EditAlarmlistForm from "./EditAlarmlistForm"
import DeleteAlarmlistModal from "./DeleteAlarmlistModal"
import Alarm from "../Alarm"
import './AlarmList.css'


const AlarmList = ({ dashAlarmlist }) => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const alarmlistId = +id
    const alarmlists = useSelector(state => state?.alarmlist?.entries)
    const alarmsObj = useSelector(state => state?.alarm?.entries)
    const alarmsArr = Object.values(alarmsObj)
    const filteredAlarms = alarmsArr.filter(alarm => alarmlistId ? alarm?.alarmlistId === alarmlistId : alarm?.alarmlistId === dashAlarmlist?.id)
    // const filteredAlarms = alarmsArr.filter(alarm => alarm?.alarmlistId === dashAlarmlist?.id)
    const [name, setName] = useState(0)
    const [mainAlarmlistSwitch, setMainAlarmlistSwitch] = useState('')
    const [openTab, setOpenTab] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [openSettings, setOpenSettings] = useState(false)
    const [showEllipsis, setShowEllipsis] = useState(false)

    useEffect(() => {
        dispatch(getAlarmlist(id ? alarmlistId : dashAlarmlist?.id))
        dispatch(getAlarms(id ? alarmlistId : dashAlarmlist?.id))
    }, [dispatch])

    useEffect(() => {
        // Sometimes, the page renders at the bottom first,
        // so this will force the page to scroll up on mount
        window.scrollTo(0, 0)

        // setMainAlarmlistSwitch(mainAlarmlistSwitch)
    }, [])

    useEffect(() => {
        if (
            (alarmlists && Object.values(alarmlists).length !== 0) ||
            (dashAlarmlist && Object.values(dashAlarmlist).length !== 0)
            ) {
            setName(alarmlists[id]?.name || dashAlarmlist?.name)
            setMainAlarmlistSwitch(alarmlists[id]?.toggle || dashAlarmlist?.toggle)
        }

        // if (alarmlists && Object.values(alarmlists).length !== 0) {
        //     setName(alarmlists[id]?.name)
        //     setMainAlarmlistSwitch(alarmlists[id]?.toggle)
        // }
        // else if (dashAlarmlist && Object.values(dashAlarmlist).length !== 0) {
        //     setName(dashAlarmlist?.name)
        //     setMainAlarmlistSwitch(dashAlarmlist?.toggle)
        // }
    }, [dashAlarmlist, alarmlists, id])

    const toggleAlarmlist = (e) => {
        e.preventDefault()

        const payload = {
            name,
            'toggle': !mainAlarmlistSwitch,
            'id': alarmlistId || dashAlarmlist?.id,
        }

        dispatch(updateAlarmlist(payload)).then(
            alarmsArr.forEach(async alarm => {
                let repeatPayload = []

                for (let day of alarm.repeat) {
                    repeatPayload.push(day.id)
                }

                if (alarm.alarmlistId === (alarmlistId || dashAlarmlist?.id)) {

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
    }

    return (
        <div className='alarmlist-content'>
            {isEditing
            ?
            <div id='edit-alarmlist-form'>
                <EditAlarmlistForm
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    alarmlist={alarmlistId ? alarmlists[alarmlistId] : dashAlarmlist}
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
                    // cursor: dashAlarmlist?.id !== 1 ? 'pointer' : ''
                }}
                onMouseEnter={() => setShowEllipsis(true)}
                onMouseLeave={() => setShowEllipsis(false)}
            >
                <div
                    className='alarmlist-header'
                    key={dashAlarmlist?.id || alarmlistId}
                >
                    <div
                        className='alarmlist-name'
                        onClick={() => setOpenTab(!openTab)}
                    >
                        {/* <h1 className="alarmlist-name-heading">{dashAlarmlist ? <Link onClick={() => setOpenTab(true)} to={`/alarmlists/${dashAlarmlist?.id}`}>{dashAlarmlist?.name}</Link> : alarmlists[id]?.name}</h1> */}
                        <h1
                            className="alarmlist-name-heading"
                            style={{color: dashAlarmlist?.toggle ? 'black' : '#a5a5a5'}}
                        >
                            {dashAlarmlist?.name}
                        </h1>
                        {filteredAlarms.length ? <div className="dropdown-alarm-btn">
                            <button
                                className='toggle-alarms-view'
                                style={{transform: openTab ? 'rotate(90deg)' : '', transition: '0.2s ease-out'}}
                            >
                                <i
                                    className="fa-solid fa-angle-right fa-xl"
                                    style={{color: dashAlarmlist?.toggle ? 'black' : '#a5a5a5'}}
                                ></i>
                            </button>
                        </div> : ''}
                    </div>
                    <div className='toggle-and-settings'>
                        <div
                            className='alarmlist-toggle'
                            style={{paddingRight: dashAlarmlist?.id === 1 ? '35px' : ''}}
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
                        {(alarmlists[alarmlistId]?.id || dashAlarmlist?.id) !== 1
                            ?
                            <div
                                className='settings-menu'
                                onClick={() => dashAlarmlist?.id !== 1 && setOpenSettings(!openSettings)}
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
                                {/* <span className="fa-solid fa-pen update-alarmlist-icon"></span> */}
                                <span className="edit-alarmlist-label">Edit</span>
                            </button>
                        </div>
                        <div className='delete-alarmlist'>
                            <DeleteAlarmlistModal alarmlist={id ? alarmlists[id] : dashAlarmlist} openSettings={openSettings} setOpenSettings={setOpenSettings} />
                        </div>
                    </div>}
                </div>
            </div>}
            <div id='alarmlist-alarms'>
                {filteredAlarms.length === 0 ?
                <div className='no-alarms-ctn'>
                    <p className='no-alarms'>{`You have no alarms under '${dashAlarmlist?.name}.' Create a new alarm in the top right corner!`}</p>
                </div>
                :
                <div className='dropdown-alarms'>
                    {filteredAlarms && filteredAlarms.map(alarm => (
                        <div className='alarm-toggle-ctn' key={alarm.id}>
                            <Alarm
                                alarm={alarm}
                                openTab={openTab}
                                setOpenTab={setOpenTab}
                                alarmlist={id ? alarmlists[id] : dashAlarmlist}
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
