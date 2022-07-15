import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from '../../store/session'

const DemoUserForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const onSubmit = async (e) => {
        e.preventDefault()

        await dispatch(login('demo@aa.io', 'password'))
        history.push('/dashboard')
    }

    return (
        <div className='splash-switch' onClick={onSubmit}>
            <div className='splash-ball'>
            </div>
        </div>
    )
}

export default DemoUserForm
