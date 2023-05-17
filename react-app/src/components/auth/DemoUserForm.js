import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from '../../store/session'
import { useViewPortContext } from '../../context/ViewportContext'

const DemoUserForm = () => {
    const dispatch = useDispatch()
    const { width } = useViewPortContext()
    const history = useHistory()

    const onSubmit = async (e) => {
        e.preventDefault()

        await dispatch(login('demo@aa.io', 'password'))
        history.push('/dashboard')
    }

    return (
        <div className='splash-switch' onClick={onSubmit}>
            {width < 1100 && <span className='splash-switch-span'>Demo</span>}
            <div className='splash-ball'>
            </div>
        </div>
    )
}

export default DemoUserForm
