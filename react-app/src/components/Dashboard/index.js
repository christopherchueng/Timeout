import React, { useState, useEffect} from "react"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getAlarmlists, getDefaultAlarmlist } from "../../store/alarmlist"
import { getAlarms } from "../../store/alarm"
import CreateAlarmlistModal from "../AlarmList/CreateAlarmlistModal"
import InlineAlarmlistEdit from "../AlarmList/InlineAlarmlistEdit/InlineAlarmlistEdit"
import { useToggleContext } from "../../context/ToggleContext"
import Alarm from "../Alarm"
import './Dashboard.css'
import AlarmList from "../AlarmList"

const Dashboard = () => {
    const dispatch = useDispatch()
    const alarmlistsObj = useSelector(state => state?.alarmlist?.entries)
    const alarmlistsArr = Object.values(alarmlistsObj)
    const alarmlists = alarmlistsArr.reverse()
    console.log('what are these alarmlights', alarmlists)
    // const defaultAlarmlist = useSelector(state => state?.alarmlist?.default)
    // const independentAlarmsObj = useSelector(state => state?.alarm?.independent)
    // const independentAlarmsArr = Object.values(independentAlarmsObj)
    // console.log('default Alarmlist here', typeof Object.values(defaultAlarmlist))

    useEffect(() => {
        // Get all alarmlists under the current user (Backend will grab the current session user)
        dispatch(getAlarmlists())
        // dispatch(getDefaultAlarmlist())
        dispatch(getAlarms(1))
    }, [dispatch])

    // useEffect(() => {
    //     setAlarmlistOn(alarmlistOn)
    //     setAlarmOn(alarmOn)
    // }, [])

    return (
        <div id='dashboard'>
            <div className='create-alarmlist-modal'>
                <CreateAlarmlistModal />
            </div>
            <div className='alarmlist-content'>
                {alarmlists && alarmlists.map(alarmlist => (
                    <>
                        <AlarmList dashAlarmlist={alarmlist} />
                        {/* <InlineAlarmlistEdit alarmlist={alarmlist} key={alarmlist.id} />
                        <Alarm alarmlist={alarmlist} /> */}
                    </>
                ))}
            </div>
        </div>
    )
}

export default Dashboard
