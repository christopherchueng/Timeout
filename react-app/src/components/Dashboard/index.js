import React, { useState, useEffect} from "react"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getAlarmlists, getDefaultAlarmlist } from "../../store/alarmlist"
import { getAlarms } from "../../store/alarm"
import CreateAlarmlistModal from "../AlarmList/CreateAlarmlistModal"
import InlineAlarmlistEdit from "../AlarmList/InlineAlarmlistEdit/InlineAlarmlistEdit"
import './Dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch()
    const alarmlistsObj = useSelector(state => state?.alarmlist?.entries)
    const alarmlistsArr = Object.values(alarmlistsObj)
    const alarmlists = alarmlistsArr.reverse()
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
                {/* <div className='default-alarmlist'>
                    <div className='default-alarmlist-name'>
                        <Link to={`/alarmlists/${defaultAlarmlist['1']?.id}`}>
                            {defaultAlarmlist[1]?.name}
                        </Link>
                    </div>
                    <div className='default-alarmlist-alarms'>
                        {independentAlarmsArr && independentAlarmsArr.map(alarm => (
                            <div key={alarm.id} className='independent-alarm-content'>
                                <div className='independent-alarm-name'>
                                    {alarm.name}
                                </div>
                                <div className='independent-alarm-time'>
                                    {alarm.hour}:{alarm.minutes < 10 ? '0' + alarm.minutes : alarm.minutes} {alarm.meridiem}
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Dashboard
