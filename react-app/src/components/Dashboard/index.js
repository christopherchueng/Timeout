import React, { useState, useEffect} from "react"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getAlarmlists } from "../../store/alarmlist"
import CreateAlarmlistModal from "../AlarmList/CreateAlarmlistModal"
import InlineAlarmlistEdit from "../AlarmList/InlineAlarmlistEdit/InlineAlarmlistEdit"
import './Dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch()
    const alarmlistsObj = useSelector(state => state?.alarmlist?.entries)
    const alarmlistsArr = Object.values(alarmlistsObj)
    const alarmlists = alarmlistsArr.reverse()
    const defaultAlarmlist = alarmlists.splice(-1, 1)[0]


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
                {alarmlists && alarmlists.map(alarmlist => (
                    <InlineAlarmlistEdit alarmlist={alarmlist} key={alarmlist.id} />
                ))}
                <div className='default-alarmlist'>
                    <Link to={`/${defaultAlarmlist?.id}`}>
                        {defaultAlarmlist?.name}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
