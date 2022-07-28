import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Modal } from "../../context/Modal"
import { useTimeContext } from "../../context/TimeContext"

const Snooze = ({ alarm, showSnoozeModal, setShowSnoozeModal, countdown, setCountdown, snoozeOn, setSnoozeOn }) => {
    const { currentTime, hour, minutes, seconds, meridiem } = useTimeContext()

    // const initialTimer = () => Number(window.localStorage.getItem('snooze') || 0)
    // const [countdown, setCountdown] = useState(60)

    // 2 cases: For repeated days
    // If click on Snooze, then settimeout for 10 min
    // If click on Turn off, then just close modal and don't do anything else

    // No repeats
    // Only turn off will be allowed. Just close modal.

    // If stop button is clicked, close the snooze modal, snooze will be turned off, and countdown will be removed from local storage
    const onClick = (e) => {
        e.preventDefault()
        setShowSnoozeModal(false)
        setSnoozeOn(false)
        window.localStorage.removeItem('snooze')
    }

    // If snooze button is clicked, modal will close, snooze will be turned on, and countdown will be set in state and in local storage
    const snoozeAlarm = () => {
        setShowSnoozeModal(false)
        setSnoozeOn(true)
        setCountdown(10)
        window.localStorage.setItem('snooze', countdown)
    }

    // const snoozeAlarm = () => {
    //     setShowSnoozeModal(false)
    //     let snoozeMin = 1;
    //     if (alarm.minutes < 50) {
    //         snoozeMin += parseInt(minutes)
    //         alarm.minutes = snoozeMin
    //     } else if (alarm.minutes >= 50) {
    //         snoozeMin = (parseInt(minutes) + snoozeMin) - 60
    //         if (snoozeMin < 10) {
    //             alarm.minutes = '0' + snoozeMin
    //         }
    //     }
    // }

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
