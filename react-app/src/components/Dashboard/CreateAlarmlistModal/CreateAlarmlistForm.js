import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createAlarmlist } from '../../../store/alarmlist'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'
import './AlarmlistForm.css'

const CreateAlarmlistForm = ({ showModal, setShowModal }) => {
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

    const onSubmit = (e) => {
        e.preventDefault()
        setIsSubmitted(true)

        const payload = {
            name,
            user_id: currentUser?.id
        }

        const alarmlist = dispatch(createAlarmlist(payload))

        if (alarmlist) {
            setName('')
            setErrors({})
            setShowModal(!showModal)
            setIsSubmitted(false)
            history.push('/dashboard')
        }

    }

    return (
        <div className='create-alarmlist'>
            <form onSubmit={onSubmit}>
                <div className='alarmlist-input'>
                    {/* -------------------- NAME -------------------- */}
                    <input
                        name='name'
                        type='text'
                        value={name}
                        placeholder='Name'
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className='submit-alarmlist'>
                        <button type='submit'><span className="fa-solid fa-check"></span></button>
                    </div>
                    <div className='alarmlist-formError-ctn'>
                        {isSubmitted && <ErrorMessage error={errors.name} setClassName="alarmlist-error" />}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateAlarmlistForm
