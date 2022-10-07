import React, { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAlarmlists } from "../../store/alarmlist"
import { getAlarms } from "../../store/alarm"
import { useTimeContext } from "../../context/TimeContext"
import { useSidebarContext } from "../../context/SidebarContext"
import CreateAlarmlistModal from "../AlarmList/CreateAlarmlistModal"
import Alarm from "../Alarm"
import AlarmList from "../AlarmList"
import './Dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch()
    const alarmlistsObj = useSelector(state => state?.alarmlist?.entries)
    const currentUser = useSelector(state => state?.session?.user)
    const alarmlists = Object.values(alarmlistsObj)
    const { hour, minutes, seconds, meridiem, currentTime } = useTimeContext()
    const { isSidebarOpen } = useSidebarContext()

    useEffect(() => {
        // Get all alarmlists under the current user (Backend will grab the current session user)
        dispatch(getAlarmlists())
        // dispatch(getAlarms(1))
    }, [dispatch])

    return (
        <div id='dashboard'>
            {/* If sidebar is open, remain in original position. Otherwise, push sidebar to left with marginLeft */}
            <div className='alarmlist-menu' style={{marginLeft: isSidebarOpen ? '0' : '-50vw'}}>
                {/* <div id='sidebar-top'>
                    <h1 className='alarmlist-title'>Alarmlists</h1>
                    <div className='create-alarmlist-modal'>
                        <CreateAlarmlistModal />
                    </div>

                </div> */}
                <div id='alarmlists'>
                    {alarmlists.length === 0 ?
                    <div className='no-alarmlists-ctn'>
                        <p className='no-alarmlists'>You currently do not have any alarmlists. Create a new alarmlist above!</p>
                    </div>
                    :
                    <>
                        {alarmlists && alarmlists.map(alarmlist => (
                            <div className='alarmlist-comp' key={alarmlist.id}>
                                <AlarmList dashAlarmlist={alarmlist} />
                            </div>
                        ))}
                    </>
                }
                </div>
            </div>
            {/* If sidebar is open, remain in original position. Otherwise, slide left 12.5vw */}
            <div
                className='global-dashboard-time'
                style={{transform: isSidebarOpen ? 'translate(0)' : 'translate(12.5vw)', transition: 'all 0.5s'}}>
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
