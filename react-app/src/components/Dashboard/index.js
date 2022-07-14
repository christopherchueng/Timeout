import React, { useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAlarmlists } from "../../store/alarmlist"
import { getAlarms } from "../../store/alarm"
import CreateAlarmlistModal from "../AlarmList/CreateAlarmlistModal"
import Alarm from "../Alarm"
import './Dashboard.css'
import AlarmList from "../AlarmList"

const Dashboard = () => {
    const dispatch = useDispatch()
    const alarmlistsObj = useSelector(state => state?.alarmlist?.entries)
    const alarmlistsArr = Object.values(alarmlistsObj)
    const alarmlists = alarmlistsArr.reverse()
    const [lsToggle, setLsToggle] = useState({})

    const localStorageData = JSON.parse(localStorage.getItem('alarmlistToggle'))

    // Make a copy of the lsToggle state
    let dashToggleCopy = {...lsToggle}


    useEffect(() => {
        // Get all alarmlists under the current user (Backend will grab the current session user)
        dispatch(getAlarmlists())
        // dispatch(getAlarms(1))
    }, [dispatch])

    useEffect(() => {
        // Allows localStorage to persist on mount
        if (localStorageData) {
            setLsToggle(localStorageData)
        }
    }, [])

    return (
        <div id='dashboard'>
            <div className='create-alarmlist-modal'>
                <CreateAlarmlistModal />
            </div>
            <div className='alarmlist-content'>
                {alarmlists && alarmlists.map(alarmlist => (
                    <div key={alarmlist.id}>
                        <AlarmList dashAlarmlist={alarmlist} lsToggle={lsToggle} setLsToggle={setLsToggle} dashToggleCopy={dashToggleCopy} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard
