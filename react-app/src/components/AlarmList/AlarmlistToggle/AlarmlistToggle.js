import { useState, useEffect } from "react"
import Alarm from "../../Alarm"
import { useToggleContext } from "../../../context/ToggleContext"

const AlarmlistToggle = ({ alarmlist, alarmOn, setAlarmOn, alarmsArr }) => {
    // const [alarmOn, setAlarmOn] = useState(false)
    const {alarmlistOn, setAlarmlistOn} = useToggleContext()

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
                    value={alarmlistOn}
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
