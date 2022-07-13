import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteAlarmlist } from '../../../store/alarmlist'
import './DeleteAlarmlistForm.css'


const DeleteAlarmlistForm = ({ dashAlarmlist, showModal, setShowModal }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const onClick = () => {
        dispatch(deleteAlarmlist(dashAlarmlist?.id))
        setShowModal(!showModal)
        history.push('/dashboard')

    }

    return (
        <div className='delete-alarmlist'>
            <div className='confirm-delete'>
                <p>{`Are you sure you want to delete '${dashAlarmlist?.name}'?`}</p>
                <p>{`All alarms under '${dashAlarmlist?.name}' will be deleted.`}</p>
            </div>
            <button onClick={onClick}>Delete</button>
        </div>
    )
}

export default DeleteAlarmlistForm
