import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createAlarmlist } from '../../../store/alarmlist'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'
import './CreateAlarmlistForm.css'

const CreateAlarmlistForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state?.session?.user)

    const [name, setName] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const validationErrors = {};
        if (name === 'Default') {
            validationErrors.name = 'Please choose a different alarmlist name.'
        }
        if (!name) {
            validationErrors.name = 'Please provide an alarmlist name.'
        }

        setErrors(validationErrors);

    }, [name])

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitted(true)

        const payload = {
            name
        }

        const alarmlist = await dispatch(createAlarmlist(payload))

        if (alarmlist) {
            setName('')
            setErrors({})
            setIsSubmitted(false)
            history.push('/dashboard')
        }

    }

    return (
        <div className='create-alarmlist'>
            <form onSubmit={onSubmit}>
                <div className='alarmlist input'>
                    {/* -------------------- NAME -------------------- */}
                    <input
                        name='name'
                        type='text'
                        value={name}
                        placeholder='Name'
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className='create-alarmlist-formError-ctn'>
                        {isSubmitted && <ErrorMessage error={errors.name} setClassName="create-alarmlist-error" />}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateAlarmlistForm
