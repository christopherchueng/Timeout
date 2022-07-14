import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import { getAlarmlist } from "../../store/alarmlist"
import { getAlarms } from "../../store/alarm"
import EditAlarmlistForm from "./EditAlarmlistForm"
import DeleteAlarmlistModal from "./DeleteAlarmlistModal"
import Alarm from "../Alarm"
import './AlarmList.css'


const AlarmList = ({ dashAlarmlist, lsToggle, setLsToggle, dashToggleCopy }) => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const alarmlistId = parseInt(id)
    const alarmlist = useSelector(state => state?.alarmlist?.entries)
    const alarmsObj = useSelector(state => state?.alarm?.entries)
    const alarmsArr = Object.values(alarmsObj)
    const filteredAlarms = alarmsArr.filter(alarm => alarmlistId ? alarm?.alarmlistId === alarmlistId : alarm?.alarmlistId === dashAlarmlist?.id)
    const localStorageData = JSON.parse(localStorage.getItem('alarmlistToggle'))

    const [openTab, setOpenTab] = useState(false)
    const [mainAlarmlistSwitch, setMainAlarmlistSwitch] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [alarmlistLsToggle, setAlarmlistLsToggle] = useState({})

    let alarmlistLsToggleCopy = {...alarmlistLsToggle}

    useEffect(() => {
        dispatch(getAlarmlist(alarmlistId || dashAlarmlist?.id))
        dispatch(getAlarms(alarmlistId || dashAlarmlist?.id))
    }, [dispatch])

    useEffect(() => {
        // Sometimes, the page renders at the bottom first,
        // so this will force the page to scroll up on mount
        window.scrollTo(0, 0)
        setMainAlarmlistSwitch(mainAlarmlistSwitch)
    }, [])

    useEffect(() => {
        // Allows localStorage to persist on mount
        if (localStorageData && id) {
            setAlarmlistLsToggle(localStorageData)
        }
    }, [])

    const onClick = () => {
        setMainAlarmlistSwitch(!mainAlarmlistSwitch)
        if (id) {
            alarmlistLsToggleCopy[id] = !mainAlarmlistSwitch
            setAlarmlistLsToggle(alarmlistLsToggleCopy)
            localStorage.setItem('alarmlistToggle', JSON.stringify(alarmlistLsToggleCopy))
        } else {
            if (!mainAlarmlistSwitch) {
                dashToggleCopy[`${dashAlarmlist?.id}`] = !mainAlarmlistSwitch
                // Set the local toggle object to the new toggle copy
                setLsToggle(dashToggleCopy)
                // Register the newly updated dashToggleCopy into local storage
                localStorage.setItem('alarmlistToggle', JSON.stringify(dashToggleCopy))
            } else {
                delete dashToggleCopy[`${dashAlarmlist?.id}`]
                setLsToggle(dashToggleCopy)
                localStorage.setItem('alarmlistToggle', JSON.stringify(dashToggleCopy))
            }
        }
    }

    return (
        <div id='alarmlists'>
            {isEditing
            ?
            <div id={'edit-alarmlist-form'}>
                <EditAlarmlistForm isEditing={isEditing} setIsEditing={setIsEditing} alarmlist={alarmlistId ? alarmlist[alarmlistId] : dashAlarmlist} />
            </div>
            :
            <div className='alarmlist-header' key={dashAlarmlist?.id || alarmlistId}>
                <div className='alarmlist-name'>
                    <h1>{dashAlarmlist ? <Link onClick={() => setOpenTab(true)} to={`/alarmlists/${dashAlarmlist?.id}`}>{dashAlarmlist?.name}</Link> : alarmlist[id]?.name}</h1>
                    {/* Default alarmlist name (alarmlistId 1) cannot be deleted or edited */}
                    {alarmlist.id !== 1
                    ?
                    <div className='alarmlist-btn-settings'>
                        <div className='edit-alarmlist'>
                            <button type='button' className={`alarmlist-edit-btn-${alarmlist.id}`} onClick={() => setIsEditing(!isEditing)}>
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
                        value={id ? alarmlistLsToggleCopy[id] : dashToggleCopy[dashAlarmlist?.id]}
                        onChange={onClick}
                        className='alarmlist-radio-box'
                        checked={id ? alarmlistLsToggleCopy[id] : dashToggleCopy[dashAlarmlist?.id]}
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
                            alarmlist={alarmlist[id] || dashAlarmlist}
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
