import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Modal } from "../../context/Modal"
import { useTimeContext } from "../../context/TimeContext"

const Snooze = ({ alarm, showSnoozeModal, setShowSnoozeModal, countdown, setCountdown }) => {
    const { currentTime, hour, minutes, seconds, meridiem } = useTimeContext()

    // const initialTimer = () => Number(window.localStorage.getItem('snooze') || 0)
    // const [countdown, setCountdown] = useState(60)

    useEffect(() => {
        const timer = setInterval(() => setCountdown(prev => {
            if (prev > 1) {
                setCountdown(prev - 1)
                window.localStorage.setItem('snooze', countdown)
            } else {
                // setCountdown(0)
                setShowSnoozeModal(true)
                // window.localStorage.setItem('snooze', countdown)
                window.localStorage.removeItem('snooze')
            }
        }), 1000)
        return () => clearInterval(timer)
    }, [countdown, seconds])

    // 2 cases: For repeated days
    // If click on Snooze, then settimeout for 10 min
    // If click on Turn off, then just close modal and don't do anything else

    // No repeats
    // Only turn off will be allowed. Just close modal.

    const onClick = (e) => {
        e.preventDefault()
        setShowSnoozeModal(false)
        window.localStorage.removeItem('snooze')
    }

    const snoozeAlarm = () => {
        setShowSnoozeModal(false)
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
