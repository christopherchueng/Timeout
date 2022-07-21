import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Modal } from "../../context/Modal"
import { useTimeContext } from "../../context/TimeContext"

const Snooze = ({ alarm, showSnoozeModal, setShowSnoozeModal }) => {
    const { currentTime, hour, minutes, seconds, meridiem } = useTimeContext()

    // 2 cases: For repeated days
    // If click on Snooze, then settimeout for 10 min
    // If click on Turn off, then just close modal and don't do anything else

    // No repeats
    // Only turn off will be allowed. Just close modal.

    const onClick = (e) => {
        e.preventDefault()
        setShowSnoozeModal(false)
    }

    const snoozeAlarm = () => {
        setShowSnoozeModal(false)
        let snoozeMin = 1;
        if (alarm.minutes < 50) {
            snoozeMin += parseInt(minutes)
            alarm.minutes = snoozeMin
        } else if (alarm.minutes >= 50) {
            snoozeMin = (parseInt(minutes) + snoozeMin) - 60
            if (snoozeMin < 10) {
                alarm.minutes = '0' + snoozeMin
            }
        }
    }

    return (
        <>
            {alarm.snooze ?
            <div className="snooze-content">
                <button className='snooze' onClick={snoozeAlarm}>
                    Snooze
                </button>
                <button className="turn-off-btn" type='submit' onClick={onClick}>
                    Stop
                </button>
            </div>
            :
            <div>
                <button className="turn-off-btn" type='submit' onClick={onClick}>
                    Stop
                </button>
            </div>}
        </>
    )
}

export default Snooze
