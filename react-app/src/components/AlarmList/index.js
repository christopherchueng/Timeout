import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import { getAlarmlist } from "../../store/alarmlist"
import { getAlarms } from "../../store/alarm"
import EditAlarmlistForm from "./EditAlarmlistForm"
import DeleteAlarmlistModal from "./DeleteAlarmlistModal"
import Alarm from "../Alarm"
import './AlarmList.css'


const AlarmList = ({ dashAlarmlist }) => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const alarmlistId = parseInt(id)
    const alarmlist = useSelector(state => state?.alarmlist?.entries)
    const alarmsObj = useSelector(state => state?.alarm?.entries)
    const alarmsArr = Object.values(alarmsObj)
    const filteredAlarms = alarmsArr.filter(alarm => alarmlistId ? alarm?.alarmlistId === alarmlistId : alarm?.alarmlistId === dashAlarmlist?.id)
    const alarmlistToggle = JSON.parse(localStorage.getItem('alarmlistToggle'))

    const [openTab, setOpenTab] = useState(false)
    const [mainAlarmlistSwitch, setMainAlarmlistSwitch] = useState(alarmlistToggle[id || `${dashAlarmlist?.id}`] || false)
    const [isEditing, setIsEditing] = useState(false)
    const [localToggle, setLocalToggle] = useState({})

    useEffect(() => {
        dispatch(getAlarmlist(alarmlistId || dashAlarmlist?.id))
        dispatch(getAlarms(alarmlistId || dashAlarmlist?.id))
    }, [dispatch])

    useEffect(() => {
        let toggleCopy = {...localToggle}

        // If alarmlistId exists in toggle copy, then update the value.
        // Otherwise, create a new instance and set to true
        if (toggleCopy[id || `${dashAlarmlist?.id}`]) {
            // setMainAlarmlistSwitch(mainAlarmlistSwitch)
            toggleCopy[id || `${dashAlarmlist?.id}`] = mainAlarmlistSwitch
        } else {
            toggleCopy[id || `${dashAlarmlist?.id}`] = true
        }

        // Set the local toggle object to the new toggle copy
        setLocalToggle(toggleCopy)
        // Register the newly updated toggleCopy into local storage
        localStorage.setItem('alarmlistToggle', JSON.stringify(localToggle))
    }, [mainAlarmlistSwitch])

    useEffect(() => {
        // Sometimes, the page renders at the bottom first,
        // so this will force the page to scroll up on mount
        window.scrollTo(0, 0)

        // On mount, grab the object stored as a value in local storage under the key 'alarmlistToggle'
        // { {'3' : true}, {'2' : false} }
        const alarmlistToggle = JSON.parse(localStorage.getItem('alarmlistToggle'))
        // If object exists in local storage, set the 'master toggle' to that value under the correct alarmlistId.
        // let toggleCopy = {...localToggle}

        // // If alarmlistId exists in toggle copy, then update the value.
        // // Otherwise, create a new instance and set to true
        // if (toggleCopy[id || `${dashAlarmlist?.id}`]) {
        //     // setMainAlarmlistSwitch(mainAlarmlistSwitch)
        //     toggleCopy[id || `${dashAlarmlist?.id}`] = mainAlarmlistSwitch
        // } else {
        //     toggleCopy[id || `${dashAlarmlist?.id}`] = !mainAlarmlistSwitch
        // }

        // // Set the local toggle object to the new toggle copy
        // setLocalToggle(toggleCopy)
        // // Register the newly updated toggleCopy into local storage
        // localStorage.setItem('alarmlistToggle', JSON.stringify(localToggle))
        setMainAlarmlistSwitch(mainAlarmlistSwitch)
    }, [])


    // const onChange = () => {
    //     setMainAlarmlistSwitch(!mainAlarmlistSwitch)
    //     // Make a copy of the localToggle state
    //     let toggleCopy = {...localToggle}

    //     // If alarmlistId exists in toggle copy, then update the value.
    //     // Otherwise, create a new instance and set to true
    //     if (toggleCopy[id || `${dashAlarmlist?.id}`]) {
    //         // setMainAlarmlistSwitch(mainAlarmlistSwitch)
    //         toggleCopy[id || `${dashAlarmlist?.id}`] = mainAlarmlistSwitch
    //     } else {
    //         toggleCopy[id || `${dashAlarmlist?.id}`] = !mainAlarmlistSwitch
    //     }

    //     // Set the local toggle object to the new toggle copy
    //     setLocalToggle(toggleCopy)
    //     // Register the newly updated toggleCopy into local storage
    //     localStorage.setItem('alarmlistToggle', JSON.stringify(localToggle))
    // }

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
                        value={mainAlarmlistSwitch}
                        onChange={() => setMainAlarmlistSwitch(!mainAlarmlistSwitch)}
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
