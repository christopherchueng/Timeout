import { useState } from "react";
import { Modal } from '../../../context/Modal'
import CreateAlarmlistForm from "./CreateAlarmlistForm";

const CreateAlarmlistModal = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button className='alarmlist-btn' onClick={() => setShowModal(true)}>
                <span className="fa-solid fa-plus fa-2x"></span>
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
