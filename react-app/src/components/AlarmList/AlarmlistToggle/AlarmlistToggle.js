import { useState, useEffect } from "react"
import Alarm from "../../Alarm"
import { useToggleContext } from "../../../context/ToggleContext"

const AlarmlistToggle = ({ alarmlist, alarmsArr }) => {
    // const [alarmOn, setAlarmOn] = useState(false)
    const [alarmlistOn, setAlarmlistOn] = useState(false)
    const { alarmOn, setAlarmOn } = useToggleContext()

    // const onChange = () => {
    //     for (let alarm of alarmsArr) {
    //         if (alarmlist?.id === alarm?.alarmlistId) {
    //             setAlarmOn(!alarmOn)
    //         }
    //     }
    // }

    /* ALARMLIST SHOULD ONLY BE ON IF ALLLLL ALARMS ARE ON
    ALARMLIST OFF SHOULD HAVE 2 OPERATIONS:
    TURN OFF ALL ALARMS IF ALL ALARMS WERE ON TO BEGIN WITH
    ALARMLIST TOGGLE SHOULD REMAIN OFF UNLESS ALL ALARMS UNDER ALARMLIST ARE ON. */
    const onChange = () => {
        let onCount = 0
        // If alarms have a toggle boolean in models, I can keep a count of the "True" elements
        // If the count === selectedAlarms.length, then alarmlist should be on. Otherwise stay off.

        // If boolean not in models, how can I keep track of each alarm and whether it's on or off with state?
        // Especially if the state variables are on a more "broader scale" type of use
        // (not directed towards every individial alarm...)???
        let selectedAlarms = alarmsArr.filter(alarm => alarmlist?.id === alarm?.alarmlistId)
        for (let alarm of selectedAlarms) {
            if (alarm?.alarmlistId === alarmlist?.id) {
                setAlarmlistOn(!alarmlistOn)
            }
        }
        // setAlarmOn(!alarmOn)
        // alarmOn ? setAlarmOn(!alarmOn) : setAlarmOn(alarmOn)
        // !alarmlistOn ? setAlarmlistOn(alarmlistOn) : setAlarmlistOn(!alarmlistOn)
    }

    useEffect(() => {
        setAlarmlistOn(alarmlistOn)
        setAlarmOn(alarmOn)
    }, [])

    return (
        <>
            <label className='alarmlist-switch'>
                <input
                    type='checkbox'
                    value={alarmlistOn}
                    onChange={onChange}
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
