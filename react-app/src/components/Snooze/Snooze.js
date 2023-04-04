import './Snooze.css'

const Snooze = ({ alarm, setShowSnoozeModal, countdown, setCountdown, setSnoozeOn }) => {
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

    return (
        <>
            <div className="snooze-content">
                <div className='snooze-name'>
                    <span>{alarm.name}</span>
                </div>
                <audio src={alarm.sound} hidden={true} autoPlay loop></audio>
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
