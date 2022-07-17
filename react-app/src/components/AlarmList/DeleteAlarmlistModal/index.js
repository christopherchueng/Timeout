import { useState } from "react";
import { Modal } from '../../../context/Modal'
import DeleteAlarmlistForm from "./DeleteAlarmlistForm";

const DeleteAlarmlistModal = ({ alarmlist, openSettings, setOpenSettings }) => {
    const [showModal, setShowModal] = useState(false)

    const onClose = () => {
        setShowModal(false)
        setOpenSettings(false)
    }

    return (
        <>
            <button className='delete-alarmlist-btn' onClick={() => setShowModal(true)}>
                <span className="fa-solid fa-trash"></span>
                <span className="delete-alarmlist-label">Delete</span>
            </button>
            {showModal && (
                <Modal onClose={onClose}>
                    <DeleteAlarmlistForm alarmlist={alarmlist} setShowModal={setShowModal} showModal={showModal} openSettings={openSettings} setOpenSettings={setOpenSettings} />
                </Modal>
            )}
        </>
      );
}

export default DeleteAlarmlistModal
