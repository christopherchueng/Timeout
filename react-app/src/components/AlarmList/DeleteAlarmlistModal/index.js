import { useState } from "react";
import { Modal } from '../../../context/Modal'
import DeleteAlarmlistForm from "./DeleteAlarmlistForm";

const DeleteAlarmlistModal = ({ dashAlarmlist }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button className='delete-alarmlist-btn' onClick={() => setShowModal(true)}>
                <span className="fa-solid fa-trash"></span>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteAlarmlistForm dashAlarmlist={dashAlarmlist} setShowModal={setShowModal} showModal={showModal} />
                </Modal>
            )}
        </>
      );
}

export default DeleteAlarmlistModal
