import { useState, useEffect } from "react"
import Alarm from "../../Alarm"

const AlarmlistToggle = ({ alarmlist }) => {
    const [alarmlistOn, setAlarmlistOn] = useState(false)
    const [alarmOn, setAlarmOn] = useState(false)

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

        </>
    )
}

export default AlarmlistToggle
