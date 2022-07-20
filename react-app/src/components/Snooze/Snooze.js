import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Modal } from "../../context/Modal"

const Snooze = ({ showSnoozeModal, setShowSnoozeModal }) => {

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
        const snoozeInterval = setInterval(() => {
            setShowSnoozeModal(true)
        }, 5000)

        return () => clearInterval(snoozeInterval)
    }

    return (
        <div className="snooze-content">
            <button className='snooze' onClick={snoozeAlarm}>
                Snooze
            </button>
            <button className="turn-off-btn" type='submit' onClick={onClick}>
                Stop
            </button>
        </div>
    )
}

export default Snooze
