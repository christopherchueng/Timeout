import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getAlarmlists } from "../../store/alarmlist"
import CreateAlarmlistModal from "./CreateAlarmlistModal"
import './Dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state?.session?.user)
    const alarmlistsObj = useSelector(state => state?.alarmlist?.entries)
    const alarmlistsArr = Object.values(alarmlistsObj).reverse()

    useEffect(() => {
        // Get all alarmlists under the current user (Backend will grab the current session user)
        dispatch(getAlarmlists())
    }, [dispatch])

    return (
        <div id='dashboard'>
            <div className='create-alarmlist-modal'>
                <CreateAlarmlistModal />
            </div>
            <div className='alarmlist-content'>
                {alarmlistsArr && alarmlistsArr.map(alarmlist => (
                    <div key={alarmlist.id}>
                        <Link to={`/${alarmlist.id}`}>{alarmlist.name === 'Default' ? 'Other' : alarmlist.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard
