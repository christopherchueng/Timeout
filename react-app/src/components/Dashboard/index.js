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
    const [localToggle, setLocalToggle] = useState({})

    const localStorageData = localStorage.getItem('alarmlistToggle')

    // Make a copy of the localToggle state
    let toggleCopy = {...localToggle}


    useEffect(() => {
        // Get all alarmlists under the current user (Backend will grab the current session user)
        dispatch(getAlarmlists())
        // dispatch(getAlarms(1))
    }, [dispatch])

    useEffect(() => {
        const AlarmlistBooleans = JSON.parse(localStorageData)
        if (AlarmlistBooleans) {
            setLocalToggle(AlarmlistBooleans)
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
                        <AlarmList dashAlarmlist={alarmlist} localToggle={localToggle} setLocalToggle={setLocalToggle} toggleCopy={toggleCopy} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard
