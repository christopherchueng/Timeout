import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Modal } from "../../context/Modal"
import { useTimeContext } from "../../context/TimeContext"
import './Snooze.css'

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
            <div className="snooze-content">
                <div className='snooze-name'>
                    <span>{alarm.name}</span>
                </div>
                {alarm.snooze ?
                <>
                    <div className="snooze-disclaimer">
                        <p>For demo purposes, the snooze alarm will go off in 10 seconds.</p>
                    </div>
                    <div className='snooze-buttons'>
                        <div className='center-button'>
                            <button className='snooze' onClick={snoozeAlarm}>
                                <span className="snooze-span">Snooze</span>
                                <div className='snooze-ball'></div>
                            </button>
                        </div>
                        <div className='turn-off-snooze'>
                            <button className="turn-off-btn" type='submit' onClick={onClick}>
                                <span className='turn-off-span'>Stop</span>
                                <div className='turn-off-ball'></div>
                            </button>
                        </div>
                    </div>
                </>
                :
                <div className='center-button'>
                    <button className="turn-off-btn" type='submit' onClick={onClick}>
                        <span className='turn-off-span'>Stop</span>
                        <div className='turn-off-ball'></div>
                    </button>
                </div>}
            </div>
        </>
    )
}

export default Snooze
