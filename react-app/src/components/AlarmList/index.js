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
    const alarmlistId = parseInt(id)
    const alarmlists = useSelector(state => state?.alarmlist?.entries)
    const alarmsObj = useSelector(state => state?.alarm?.entries)
    const alarmsArr = Object.values(alarmsObj)
    const filteredAlarms = alarmsArr.filter(alarm => alarmlistId ? alarm?.alarmlistId === alarmlistId : alarm?.alarmlistId === dashAlarmlist?.id)

    const [name, setName] = useState(0)
    const [mainAlarmlistSwitch, setMainAlarmlistSwitch] = useState('')
    const [openTab, setOpenTab] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        dispatch(getAlarmlist(alarmlistId || dashAlarmlist?.id))
        dispatch(getAlarms(alarmlistId || dashAlarmlist?.id))
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
    }, [dashAlarmlist, alarmlists])

    const onChange = async (e) => {
        e.preventDefault()

        const payload = {
            name,
            'toggle': !mainAlarmlistSwitch,
            'id': alarmlistId || dashAlarmlist?.id,
        }

        await dispatch(updateAlarmlist(payload))
        alarmsArr.forEach(async alarm => {
            // If main toggle is OFF and is clicked, TURN OFF ALL ALARMS
            if ((alarm.alarmlistId === (alarmlistId || dashAlarmlist?.id)) && mainAlarmlistSwitch === true) {
                let repeatPayload = []
                for (let day of alarm.repeat) {
                    repeatPayload.push(day.id)
                }
                const alarmPayload = {
                    'alarm_id': alarm.id,
                    'name': alarm.name,
                    'hour': alarm.hour,
                    'minutes': `${alarm.minutes}`,
                    'meridiem': alarm.meridiem,
                    'sound': alarm.sound,
                    'repeat': `${repeatPayload}`,
                    'snooze': alarm.snooze,
                    'toggle': false,
                    'alarmlist_id': alarm.alarmlistId
                }
                await dispatch(updateAlarm(alarmPayload))
            // If main toggle is OFF and is clicked, TURN ON ALL ALARMS
            } else if ((alarm.alarmlistId === (alarmlistId || dashAlarmlist?.id)) && mainAlarmlistSwitch === false) {
                let repeatPayload = []
                for (let day of alarm.repeat) {
                    repeatPayload.push(day.id)
                }
                const alarmPayload = {
                    'alarm_id': alarm.id,
                    'name': alarm.name,
                    'hour': alarm.hour,
                    'minutes': `${alarm.minutes}`,
                    'meridiem': alarm.meridiem,
                    'sound': alarm.sound,
                    'repeat': `${repeatPayload}`,
                    'snooze': alarm.snooze,
                    'toggle': true,
                    'alarmlist_id': alarm.alarmlistId
                }
                await dispatch(updateAlarm(alarmPayload))
            }
        })
    }

    return (
        <div id='alarmlists'>
            {isEditing
            ?
            <div id={'edit-alarmlist-form'}>
                <EditAlarmlistForm isEditing={isEditing} setIsEditing={setIsEditing} alarmlist={alarmlistId ? alarmlists[alarmlistId] : dashAlarmlist} />
            </div>
            :
            <div className='alarmlist-header' key={dashAlarmlist?.id || alarmlistId}>
                <div className='alarmlist-name'>
                    <h1>{dashAlarmlist ? <Link onClick={() => setOpenTab(true)} to={`/alarmlists/${dashAlarmlist?.id}`}>{dashAlarmlist?.name}</Link> : alarmlists[id]?.name}</h1>
                    {/* Default alarmlist name (alarmlistId 1) cannot be deleted or edited */}
                    {(alarmlists[alarmlistId]?.id || dashAlarmlist?.id) !== 1
                    ?
                    <div className='alarmlist-btn-settings'>
                        <div className='edit-alarmlist'>
                            <button type='button' className={`alarmlist-edit-btn-${alarmlists.id}`} onClick={() => setIsEditing(!isEditing)}>
                                <span className="fa-solid fa-pen"></span>
                            </button>
                        </div>
                        <div className='delete-alarmlist'>
                            <DeleteAlarmlistModal dashAlarmlist={dashAlarmlist} />
                        </div>
                    </div>
                    : ""}
                </div>
            </div>}
            <div id='alarmlist-alarms'>
                <label className='alarmlist-switch'>
                    <input
                        type='checkbox'
                        value={mainAlarmlistSwitch}
                        onChange={onChange}
                        className='alarmlist-radio-box'
                        checked={mainAlarmlistSwitch}
                    />
                    <div className='alarmlist-slider alarmlist-ball'>
                    </div>
                </label>
                <button className='toggle-alarms-view' onClick={() => setOpenTab(!openTab)}>
                    <i className="fa-solid fa-angle-right"></i>
                </button>
                {filteredAlarms && filteredAlarms.map(alarm => (
                    <div className='alarm-ctn' key={alarm.id}>
                        <Alarm
                            alarm={alarm}
                            openTab={openTab}
                            setOpenTab={setOpenTab}
                            alarmsArr={alarmsArr}
                            alarmlist={id ? alarmlists[id] : dashAlarmlist}
                            mainAlarmlistSwitch={mainAlarmlistSwitch}
                            setMainAlarmlistSwitch={setMainAlarmlistSwitch}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AlarmList
