import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getAlarmlist } from "../../store/alarmlist"
import { getAlarms } from "../../store/alarm"
import Alarm from "../Alarm"


const AlarmList = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const alarmlistId = parseInt(id)
    const alarmlist = useSelector(state => state?.alarmlist?.entries)
    const alarmsObj = useSelector(state => state?.alarm?.entries)
    const alarmsArr = Object.values(alarmsObj)

    const [openTab, setOpenTab] = useState(false)

    useEffect(() => {
        dispatch(getAlarmlist(alarmlistId))
        dispatch(getAlarms(alarmlistId))
    }, [dispatch])

    useEffect(() => {
        setOpenTab(true)
    }, [])

    // Sometimes, the page renders at the bottom first,
    // so this will force the page to scroll up on mount
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <div id='alarmlists'>
            <div className='alarmlist-header'>
                <div className='alarmlist-name'>
                    <h1>{alarmlist[id]?.name}</h1>
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
                <Alarm alarmlist={alarmlist[id]} />
            </div>
        </div>
    )
}

export default AlarmList
