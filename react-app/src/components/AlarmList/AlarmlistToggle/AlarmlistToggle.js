import { useState, useEffect } from "react"
import Alarm from "../../Alarm"
import { useToggleAlarmlist } from "../../../context/ToggleAlarmlist"

const AlarmlistToggle = ({ alarmlist, alarmOn, setAlarmOn }) => {
    // const [alarmOn, setAlarmOn] = useState(false)
    const {alarmlistOn, setAlarmlistOn} = useToggleAlarmlist()

    useEffect(() => {
        setAlarmlistOn(alarmlistOn)
    }, [])

    return (
        <>
            <label className='alarmlist-switch'>
                <input
                    type='checkbox'
                    // value={alarmlistOn || alarmOn}
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
