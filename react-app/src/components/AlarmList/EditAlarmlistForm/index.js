import React, { useState, useEffect, useRef, forwardRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateAlarmlist } from '../../../store/alarmlist'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'

const EditAlarmlistForm = ({ isEditing, setIsEditing, alarmlist }) => {
    console.log('here in edit alarmlist form', alarmlist)
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state?.session?.user)

    const [name, setName] = useState(alarmlist.name)
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
            id: alarmlist?.id,
            name
        }

        const updatedAlarmlist = dispatch(updateAlarmlist(payload))

        if (updatedAlarmlist) {
            setName('')
            setErrors({})
            setIsSubmitted(false)
            setIsEditing(!isEditing)
            history.push('/dashboard')
        }

    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className='alarmlist-input'>
                    {/* -------------------- NAME -------------------- */}
                    <input
                        name={'name'}
                        type='text'
                        value={name}
                        placeholder='Name'
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className='edit-alarmlist-form-btns'>
                        <div className='submit-alarmlist'>
                            <button type='submit'><span className="fa-solid fa-check"></span></button>
                        </div>
                        <div className='cancel-alarmlist'>
                            <button type='button' onClick={() => setIsEditing(!isEditing)}><span className="fa-solid fa-xmark"></span></button>
                        </div>
                    </div>
                    <div className='alarmlist-formError-ctn'>
                        {isSubmitted && <ErrorMessage error={errors.name} setClassName="alarmlist-error" />}
                    </div>
                </div>
            </form>
        </>
      );
}

export default EditAlarmlistForm
