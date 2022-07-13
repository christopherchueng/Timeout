import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getAlarmlist } from "../../store/alarmlist"
import { getAlarms } from "../../store/alarm"
import { useToggleContext } from "../../context/ToggleContext"
import Alarm from "../Alarm"


const AlarmList = ({ dashAlarmlist }) => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const alarmlistId = parseInt(id)
    const alarmlist = useSelector(state => state?.alarmlist?.entries)
    const alarmsObj = useSelector(state => state?.alarm?.entries)
    const alarmsArr = Object.values(alarmsObj)

    const [openTab, setOpenTab] = useState(false)
    const [mainAlarmlistSwitch, setMainAlarmlistSwitch] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    console.log('here is the alarmlist', alarmlist)
    console.log('here is the dashboard alarmlist', dashAlarmlist)

    useEffect(() => {
        dispatch(getAlarmlist(alarmlistId))
        dispatch(getAlarms(alarmlistId))
    }, [dispatch])

    useEffect(() => {
        // Sometimes, the page renders at the bottom first,
        // so this will force the page to scroll up on mount
        window.scrollTo(0, 0)
        setOpenTab(true)
        // setAlarmlistOn(alarmlistOn)
        // setAlarmOn(alarmOn)
    }, [])


    return (
        <div id='alarmlists'>
            <div className='alarmlist-header'>
                <div className='alarmlist-name'>
                    <h1>{alarmlist[id]?.name || dashAlarmlist?.name}</h1>
                </div>
                {/* <div className='alarmlist-toggle'>
                    <label className='alarm-switch'>
                        <input
                            type='checkbox'
                            // onClick={}
                            className='alarm-radio-box'
                        />
                        <div className='alarm-slider alarm-ball'>
                        </div>
                    </label>
                </div> */}
            </div>
            <div id='alarmlist-alarms'>
                <Alarm
                    alarmlist={alarmlist[id] || dashAlarmlist}
                    mainAlarmlistSwitch={mainAlarmlistSwitch}
                    setMainAlarmlistSwitch={setMainAlarmlistSwitch}
                />
            </div>
        </div>
    )
}

export default AlarmList
