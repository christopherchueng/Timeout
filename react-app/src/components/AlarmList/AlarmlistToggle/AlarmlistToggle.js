import { useState, useEffect } from "react"
import Alarm from "../../Alarm"
import AlarmToggle from "../../Alarm/AlarmToggle"
import { useToggleContext } from "../../../context/ToggleContext"

const AlarmlistToggle = ({ alarmlist, alarmsArr, mainAlarmlistSwitch, setMainAlarmlistSwitch }) => {
    // const [alarmOn, setAlarmOn] = useState(false)
    // const [alarmlistOn, setAlarmlistOn] = useState(false)
    // const { alarmOn, setAlarmOn } = useToggleContext()

    let onCount = 0

    useEffect(() => {
        // Set alarmlist toggle and alarm toggles to state on mount
        // setAlarmlistOn(alarmlistOn)
        // setAlarmOn(alarmOn)
    }, [])

    // useEffect(() => {
    //     // Some conditional stating: if all alarms are on, then turn alarmlist on.
    //     // OR if you simply turn the alarmlist toggle on,
    //     //  all alarms toggles will be on and vice versa.
    //     setAlarmlistOn(!alarmlistOn)
    // }, [alarmOn])

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
    // const onChange = () => {
    //     // If alarms have a toggle boolean in models, I can keep a count of the "True" elements
    //     // If the count === selectedAlarms.length, then alarmlist should be on. Otherwise stay off.

    //     // If boolean not in models, how can I keep track of each alarm and whether it's on or off with state?
    //     // Especially if the state variables are on a more "broader scale" type of use
    //     // (not directed towards every individial alarm...)???
    //     let selectedAlarms = alarmsArr.filter(alarm => alarmlist?.id === alarm?.alarmlistId)
    //     for (let alarm of selectedAlarms) {
    //         if (alarm?.alarmlistId === alarmlist?.id) {
    //             setAlarmlistOn(!alarmlistOn)
    //         }
    //     }
    //     // setAlarmOn(!alarmOn)
    //     // alarmOn ? setAlarmOn(!alarmOn) : setAlarmOn(alarmOn)
    //     // !alarmlistOn ? setAlarmlistOn(alarmlistOn) : setAlarmlistOn(!alarmlistOn)
    // }

    return (
        <>
            <label className='alarmlist-switch'>
                <input
                    type='checkbox'
                    value={mainAlarmlistSwitch}
                    onClick={() => setMainAlarmlistSwitch(!mainAlarmlistSwitch)}
                    className='alarmlist-radio-box'
                    checked={mainAlarmlistSwitch}
                />
                <div className='alarmlist-slider alarmlist-ball'>
                </div>
            </label>
            {/* <AlarmToggle alarmOn={alarmOn} setAlarmOn={setAlarmOn} /> */}
        </>
    )
}

export default AlarmlistToggle
