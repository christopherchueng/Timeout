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
        if (name.length > 100) {
            validationErrors.name = 'Please select a name up to 100 characters long.'
        }

        setErrors(validationErrors);

    }, [name])

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitted(true)
        const payload = {
            name,
            user_id: currentUser?.id
        }

        const data = await dispatch(createAlarmlist(payload))

        if (data && data.errors) {
            setErrors(data)
            // setShowModal(true)
        }
        console.log('ERRORS HERE', errors)
        // console.log('ERRRORSSS LENGYTH', errors.length)

        // if (errors.length) {
        //     setName('')
            // setShowModal(!showModal)
        //     setErrors({})
        //     setIsSubmitted(false)
        //     history.push('/dashboard')
        // }
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
                    <div className='alarmlist-formError-ctn'>
                        {isSubmitted && <ErrorMessage error={errors?.name} setClassName="alarmlist-error" />}
                    </div>
                    <div className='submit-alarmlist'>
                        <button type='submit'><span className="fa-solid fa-check"></span></button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateAlarmlistForm
