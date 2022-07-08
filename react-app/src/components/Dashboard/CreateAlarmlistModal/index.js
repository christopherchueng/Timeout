import { useState } from "react";
import { Modal } from '../../../context/Modal'
import CreateAlarmlistForm from "./CreateAlarmlistForm";

const CreateAlarmlistModal = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button className='alarmlist-btn' onClick={() => setShowModal(true)}>
                <img className='add-alarm-icon' title='Upload' src='/images/add-alarm-icon.png'></img>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateAlarmlistForm showModal={showModal} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
      );
}

export default CreateAlarmlistModal
