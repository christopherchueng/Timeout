import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAlarmlist } from '../../../store/alarmlist'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'
import './AlarmlistForm.css'

const CreateAlarmlistForm = ({ setShowModal }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state?.session?.user)

    const [name, setName] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const validationErrors = {}

        if (name.length > 100) {
            validationErrors.name = 'Please select a name up to 100 characters long.'
        }

        setErrors(validationErrors)

    }, [name])

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitted(true)
        const payload = {
            name,
            'toggle': true,
            'user_id': currentUser?.id
        }

        const data = await dispatch(createAlarmlist(payload))

        if (data && data.errors) {
            setErrors(data.errors)
            setShowModal(true)
        } else {
            setShowModal(false)
            setIsSubmitted(false)
        }
    }

    return (
        <div className='create-alarmlist'>
            <h1 className='alarmlist-form-title'>Add Alarmlist</h1>
            <form onSubmit={onSubmit}>
                <div className='alarmlist-input'>
                    {/* -------------------- NAME -------------------- */}
                    <input
                        name='name'
                        type='text'
                        className='alarmlist-textbox'
                        value={name}
                        placeholder='Name'
                        onChange={(e) => setName(e.target.value)}
                        style={{backgroundColor: errors['name'] && isSubmitted ? '#FFA194' : ""}}
                    />
                    <div className='alarmlist-formError-ctn'>
                        {isSubmitted && <ErrorMessage error={errors?.name} setClassName="alarmlist-error" />}
                    </div>
                    <div className='submit-alarmlist'>
                        <button type='submit' className='submit-alarmlist-switch'>
                            <span className="submit-alarmlist-span">Save</span>
                            <div className='submit-alarmlist-ball'></div>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateAlarmlistForm
