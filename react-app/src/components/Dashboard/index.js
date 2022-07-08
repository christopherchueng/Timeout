import React, { useState, useEffect} from "react"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getAlarmlists, getDefaultAlarmlist } from "../../store/alarmlist"
import { getAlarms } from "../../store/alarm"
import CreateAlarmlistModal from "../AlarmList/CreateAlarmlistModal"
import InlineAlarmlistEdit from "../AlarmList/InlineAlarmlistEdit/InlineAlarmlistEdit"
import Alarm from "../Alarm"
import './Dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch()
    const alarmlistsObj = useSelector(state => state?.alarmlist?.entries)
    const alarmlistsArr = Object.values(alarmlistsObj)
    const alarmlists = alarmlistsArr.reverse()
    const defaultAlarmlist = useSelector(state => state?.alarmlist?.default)
    const independentAlarms = useSelector(state => state?.alarm?.default)


    useEffect(() => {
        // Get all alarmlists under the current user (Backend will grab the current session user)
        dispatch(getAlarmlists())
        dispatch(getDefaultAlarmlist())
        dispatch(getAlarms(defaultAlarmlist?.id))
    }, [dispatch])



    return (
        <div id='dashboard'>
            <div className='create-alarmlist-modal'>
                <CreateAlarmlistModal />
            </div>
            <div className='alarmlist-content'>
                {alarmlists && alarmlists.map(alarmlist => (
                    <>
                        <InlineAlarmlistEdit alarmlist={alarmlist} key={alarmlist.id} />
                    </>
                ))}
                <div className='default-alarmlist'>
                    <div className='default-alarmlist-name'>
                        <Link to={`/${defaultAlarmlist?.id}`}>
                            {defaultAlarmlist[1]?.name}
                        </Link>
                    </div>
                    <div className='default-alarmlist-alarms'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
