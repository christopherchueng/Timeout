import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { getAlarmlists } from "../../store/alarmlist"
import { useTimeContext } from "../../context/TimeContext"
import { useSidebarContext } from "../../context/SidebarContext"
import { displayDaysOfTheWeek } from "../utils"
import CreateAlarmlistModal from "../AlarmList/CreateAlarmlistModal"
import AlarmList from "../AlarmList"
import './Dashboard.css'
import DashNavBar from "./DashNavBar"

const Dashboard = () => {
    const dispatch = useDispatch()
    const alarmlists = useSelector(state => Object.values(state?.alarmlist?.entries))
    const { hour, minutes, seconds, currentTime } = useTimeContext()
    const { isSidebarOpen } = useSidebarContext()

    const subDirectoryURL = useLocation().pathname

    useEffect(() => {
        // Get all alarmlists under the current user (Backend will grab the current session user)
        dispatch(getAlarmlists())
    }, [dispatch])

    return (
        <div id='dashboard--refactored'>
            {/* If sidebar is open, push dashboard to right.*/}
            <div id='dashboard' style={{marginLeft: isSidebarOpen ? '360px' : '0'}}>
                <div id='dash-navbar'>
                    <DashNavBar />
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
                    <div className='dashboard-days'>
                        {displayDaysOfTheWeek(currentTime.toLocaleTimeString('en-US', {weekday: 'short'}))}
                    </div>
                </div>
            </div>
            {/* If sidebar is open, remain in original position. Otherwise, pull sidebar to left (offscreen) with marginLeft */}
            <div className='alarmlist-menu' style={{marginLeft: isSidebarOpen ? '0' : '-25vw'}}>
                {/* Only show alarmlist heading on the dashboard */}
                {(subDirectoryURL === '/dashboard') &&
                // If sidebar is open, remain in original position. Otherwise, push div to left by -25vw
                <div className='navbar-alarmlist-heading'>
                    <h1 className='alarmlist-title'>Alarmlists</h1>
                    <div className='create-alarmlist-modal'>
                        <CreateAlarmlistModal />
                    </div>
                </div>}
                <div id='alarmlists'>
                    {alarmlists.length === 0 ?
                    <div className='no-alarmlists-ctn'>
                        <p className='no-alarmlists'>You currently do not have any alarmlists. Create a new alarmlist above!</p>
                    </div>
                    :
                    <>
                        {alarmlists && alarmlists.map(alarmlist => (
                            <div className='alarmlist-comp' key={alarmlist.id}>
                                <AlarmList alarmlist={alarmlist} />
                            </div>
                        ))}
                    </>
                }
                </div>
            </div>
        </div>
    )
}

export default Dashboard
