import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAlarms } from "../../store/alarm"
import { useParams, Link, useHistory } from "react-router-dom"
import AlarmlistToggle from "../AlarmList/AlarmlistToggle/AlarmlistToggle"
import AlarmToggle from "./AlarmToggle"

import './Alarm.css'

const Alarm = ({ alarmlist }) => {
    const dispatch = useDispatch()
    // Only use this id below for when you are on the alarmlists/:id page! DO NOT USE WHEN ON DASHBOARD
    const { id } = useParams()
    const alarmsObj = useSelector(state => state?.alarm?.entries)
    const alarmsArr = Object.values(alarmsObj)

    const [alarmlistOn, setAlarmlistOn] = useState(false)
    const [openTab, setOpenTab] = useState(false)

    useEffect(() => {
        alarmlist.id === 1 ? setOpenTab(true) : setOpenTab(false)
    }, [])

    useEffect(() => {
        // Need the or statement here because Alarm is used in alarmlist/:id AND dashboard
        // parseInt(id) will be used for when user is on the alarmlist page
        // alarmlist?.id is used for dashboard because parseInt(id) will be rendered as NaN.
        dispatch(getAlarms(parseInt(id) || alarmlist?.id))
    }, [dispatch])

    return (
        <div className="toggle-alarms">
            <AlarmlistToggle alarmlist={alarmlist} />
            <button className='toggle-alarms-view' onClick={() => setOpenTab(!openTab)}>
                <i className="fa-solid fa-angle-right"></i>
            </button>
            {openTab ?
                <div id='dashboard-alarms'>
                    <div className='alarm-info'>
                        {alarmsArr && alarmsArr.map(alarm => (
                            alarm.alarmlistId === alarmlist?.id &&
                            <div className='alarm-toggle-ctn'>
                                {/* <AlarmToggle alarm={alarm} id={id} key={alarm.id} alarmOn={alarmOn} setAlarmOn={setAlarmOn} /> */}
                                <AlarmToggle alarm={alarm} id={id} key={alarm.id} />
                            </div>
                        ))}

                    </div>
                </div>
            : ""}
        </div>
    )
}

export default Alarm
