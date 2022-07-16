import React, { useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAlarmlists } from "../../store/alarmlist"
import { getAlarms } from "../../store/alarm"
import { useTimeContext } from "../../context/TimeContext"
import CreateAlarmlistModal from "../AlarmList/CreateAlarmlistModal"
import Alarm from "../Alarm"
import './Dashboard.css'
import AlarmList from "../AlarmList"

const Dashboard = () => {
    const dispatch = useDispatch()
    const alarmlistsObj = useSelector(state => state?.alarmlist?.entries)
    const alarmlists = Object.values(alarmlistsObj)
    const { hour, minutes, seconds, meridiem, currentTime } = useTimeContext()

    useEffect(() => {
        // Get all alarmlists under the current user (Backend will grab the current session user)
        dispatch(getAlarmlists())
        // dispatch(getAlarms(1))
    }, [dispatch])

    return (
        <div id='dashboard'>
            <div className='alarmlist-menu'>
                <div className='create-alarmlist-modal'>
                    <CreateAlarmlistModal />
                </div>
                <div className='alarmlist-content'>
                    {alarmlists && alarmlists.map(alarmlist => (
                        <div key={alarmlist.id}>
                            <AlarmList dashAlarmlist={alarmlist} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='global-dashboard-time'>
                <div className='dashboard-time-ctn'>
                    <div className='splash-hour'>
                        {hour}
                    </div>
                    <div className='splash-second-colon'>
                        {seconds % 2 === 0 ? ":" : ""}
                    </div>
                    <div className='splash-minutes'>
                        {minutes < 10 ? '0' + minutes : minutes}
                    </div>
                    <div className='meridiem-ctn'>
                        <div className='splash-meridiem'>
                            {currentTime.toLocaleTimeString('en-US', {hour12: false, hour: 'numeric'}) >= 12 && currentTime.toLocaleTimeString('en-US', {hour12: false, hour: 'numeric'}) <= 23 ? 'PM' : 'AM'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
