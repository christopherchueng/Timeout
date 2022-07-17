import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteAlarmlist } from '../../../store/alarmlist'
import './DeleteAlarmlistForm.css'


const DeleteAlarmlistForm = ({ alarmlist, showModal, setShowModal, openSettings, setOpenSettings }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const onClick = () => {
        dispatch(deleteAlarmlist(alarmlist?.id))
        setShowModal(!showModal)
        setOpenSettings(false)
        history.push('/dashboard')
    }

    return (
        <div className='delete-alarmlist-modal'>
            <div className='confirm-delete'>
                <p>{`Are you sure you want to delete '${alarmlist?.name}'?`}</p>
                <p>{`All alarms under '${alarmlist?.name}' will be deleted.`}</p>
            </div>
            <div className='remove-alarmlist-btn-ctn'>
                <button className='submit-alarmlist-switch' onClick={onClick}>
                    <span className="submit-alarmlist-span">Delete</span>
                    <div className='submit-alarmlist-ball'></div>
                </button>
            </div>
        </div>
    )
}

export default DeleteAlarmlistForm
