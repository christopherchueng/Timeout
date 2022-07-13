import { useState, useEffect } from "react"
import Alarm from "../../Alarm"

const AlarmlistToggle = ({ alarmlist, alarmlistOn, setAlarmlistOn, alarmOn, setAlarmOn }) => {
    // const [alarmOn, setAlarmOn] = useState(false)

    return (
        <>
            <label className='alarmlist-switch'>
                <input
                    type='checkbox'
                    // value={alarmlistOn || alarmOn}
                    onClick={() => setAlarmlistOn(!alarmlistOn)}
                    className='alarmlist-radio-box'
                    // checked={alarmOn}
                />
                <div className='alarmlist-slider alarmlist-ball'>
                </div>
            </label>

        </>
    )
}

export default AlarmlistToggle
