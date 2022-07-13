import { useState } from "react"
import Alarm from "../../Alarm"

const AlarmlistToggle = ({ alarmlist }) => {
    const [alarmlistOn, setAlarmlistOn] = useState(false)
    const [alarmOn, setAlarmOn] = useState(false)
    const [openTab, setOpenTab] = useState(false)

    return (
        <>
            <label className='alarmlist-switch'>
                <input
                    type='checkbox'
                    value={alarmlistOn || alarmOn}
                    onClick={() => setAlarmlistOn(!alarmlistOn)}
                    className='alarmlist-radio-box'
                    checked={alarmlistOn}
                />
                <div className='alarmlist-slider alarmlist-ball'>
                </div>
            </label>
            <button className='toggle-alarms-view' onClick={() => setOpenTab(!openTab)}>
                <i className="fa-solid fa-angle-right"></i>
            </button>
            {openTab ?
                <div id='dashboard-alarms'>
                    {/* <Alarm alarmlist={alarmlist} key={alarmlist.id} alarmOn={alarmOn} setAlarmOn={setAlarmOn} /> */}
                    <Alarm alarmlist={alarmlist} key={alarmlist.id} alarmOn={alarmOn} setAlarmOn={setAlarmOn} />
                </div>
            : ""}
        </>
    )
}

export default AlarmlistToggle
