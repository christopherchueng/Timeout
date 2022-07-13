import { useState, useEffect } from "react"
import Alarm from "../../Alarm"
import { useToggleAlarmlist } from "../../../context/ToggleAlarmlist"

const AlarmlistToggle = ({ alarmlist, alarmOn, setAlarmOn, alarmsArr }) => {
    // const [alarmOn, setAlarmOn] = useState(false)
    const {alarmlistOn, setAlarmlistOn} = useToggleAlarmlist()

    // const onChange = () => {
    //     for (let alarm of alarmsArr) {
    //         if (alarmlist?.id === alarm?.alarmlistId) {
    //             setAlarmOn(!alarmOn)
    //         }
    //     }
    // }

    const onChange = () => {
        for (let alarm of alarmsArr) {
            if (alarm?.alarmlistId === alarmlist?.id) {
                setAlarmOn(!alarmOn)
            }
        }
        // alarmOn ? setAlarmOn(!alarmOn) : setAlarmOn(alarmOn)
        // !alarmlistOn ? setAlarmlistOn(alarmlistOn) : setAlarmlistOn(!alarmlistOn)
    }

    useEffect(() => {
        setAlarmlistOn(alarmlistOn)
    }, [])

    return (
        <>
            <label className='alarmlist-switch'>
                <input
                    type='checkbox'
                    value={alarmlistOn || alarmOn}
                    onChange={onChange}
                    className='alarmlist-radio-box'
                    checked={alarmOn || alarmlistOn}
                />
                <div className='alarmlist-slider alarmlist-ball'>
                </div>
            </label>

        </>
    )
}

export default AlarmlistToggle
