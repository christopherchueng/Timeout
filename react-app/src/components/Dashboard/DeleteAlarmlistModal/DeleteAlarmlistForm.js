import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteAlarmlist } from '../../../store/alarmlist'


const DeleteAlarmlistForm = ({ alarmlist, showModal, setShowModal }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const onClick = () => {
        dispatch(deleteAlarmlist(alarmlist?.id))
        setShowModal(!showModal)
        history.push('/dashboard')

    }

    return (
        <div className='delete-alarmlist'>
            <div className='confirm-delete'>
                <p>{`Are you sure you want to delete ${alarmlist.name}?`}</p>
                <p>{`All alarms under ${alarmlist.name} will be deleted.`}</p>
            </div>
            <button onClick={onClick}>Delete</button>
        </div>
    )
}

export default DeleteAlarmlistForm
