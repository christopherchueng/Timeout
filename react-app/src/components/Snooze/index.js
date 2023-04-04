import { Modal } from "../../context/Modal"
import Snooze from "./Snooze"
import './Snooze.css'

const SnoozeModal = ({ alarm, alarmOn, setAlarmOn, showSnoozeModal, setShowSnoozeModal, countdown, setCountdown, snoozeOn, setSnoozeOn }) => {
    return (
        <div className='snooze-modal-ctn'>
            <Modal onClose={() => setShowSnoozeModal(false)} onChange={() => setShowSnoozeModal(false)}>
                <Snooze
                    showSnoozeModal={showSnoozeModal}
                    setShowSnoozeModal={setShowSnoozeModal}
                    alarm={alarm}
                    alarmOn={alarmOn}
                    setAlarmOn={setAlarmOn}
                    countdown={countdown}
                    setCountdown={setCountdown}
                    snoozeOn={snoozeOn}
                    setSnoozeOn={setSnoozeOn}
                />
            </Modal>
        </div>
      );
}

export default SnoozeModal
