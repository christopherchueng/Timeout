import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import { getAlarmlist, updateAlarmlist } from "../../store/alarmlist"
import { getAlarms } from "../../store/alarm"
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

    const [openTab, setOpenTab] = useState(false)
    const [mainAlarmlistSwitch, setMainAlarmlistSwitch] = useState(alarmlists[id]?.toggle || dashAlarmlist?.toggle)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        dispatch(getAlarmlist(alarmlistId || dashAlarmlist?.id))
        dispatch(getAlarms(alarmlistId || dashAlarmlist?.id))
    }, [dispatch, alarmlists[id]?.toggle, dashAlarmlist?.toggle])

    useEffect(() => {
        setMainAlarmlistSwitch(alarmlists[id]?.toggle || dashAlarmlist?.toggle)
    }, [alarmlists[id]?.toggle, dashAlarmlist?.toggle])

    useEffect(() => {
        // Sometimes, the page renders at the bottom first,
        // so this will force the page to scroll up on mount
        window.scrollTo(0, 0)

        setMainAlarmlistSwitch(mainAlarmlistSwitch)
    }, [])
    console.log('here is alarmlist', alarmlists[alarmlistId]?.id)

    const onChange = async (e) => {
        e.preventDefault()
        setMainAlarmlistSwitch(!mainAlarmlistSwitch)

        const payload = {
            'name': alarmlists[id]?.name || dashAlarmlist?.name,
            'toggle': !mainAlarmlistSwitch,
            'id': alarmlistId || dashAlarmlist?.id,
        }

        await dispatch(updateAlarmlist(payload))
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
                        onChange={(e) => onChange(e)}
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
                            alarmlist={alarmlists[id] || dashAlarmlist}
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
