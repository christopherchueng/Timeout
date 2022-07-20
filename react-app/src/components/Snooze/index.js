import { useState } from "react";
import { Modal } from "../../context/Modal";
import Snooze from "./Snooze";
import './Snooze.css'

const SnoozeModal = ({ alarm, alarmOn, setAlarmOn, showSnoozeModal, setShowSnoozeModal }) => {
    return (
        <div className='snooze-modal-ctn'>
            <Modal onClose={() => setShowSnoozeModal(false)} onChange={() => setShowSnoozeModal(false)}>
                <Snooze
                    showSnoozeModal={showSnoozeModal}
                    setShowSnoozeModal={setShowSnoozeModal}
                    alarm={alarm}
                    alarmOn={alarmOn}
                    setAlarmOn={setAlarmOn}
                />
            </Modal>
        </div>
      );
}

export default SnoozeModal
