import React, { useState, useEffect, useRef, forwardRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateAlarmlist } from '../../../store/alarmlist'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'

const EditAlarmlistForm = ({ isEditing, setIsEditing, alarmlist, openSettings, setOpenSettings }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state?.session?.user)

    const [name, setName] = useState('')
    const [toggle, setToggle] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState({});
    // const [name, setName] = useState(alarmlist.name)
    // const [toggle, setToggle] = useState(alarmlist.toggle)
    // const [isSubmitted, setIsSubmitted] = useState(false)
    // const [errors, setErrors] = useState({});

    useEffect(() => {
        setName(alarmlist?.name)
        setToggle(alarmlist?.toggle)
    }, [])

    useEffect(() => {
        const validationErrors = {};
        if (name === 'Default') {
            validationErrors.name = 'Please choose a different alarmlist name.'
        }
        // if (!name) {
        //     validationErrors.name = 'Please provide an alarmlist name.'
        // }
        if (name.length > 100) {
            validationErrors.name = 'Please select a name up to 100 characters long.'
        }

        setErrors(validationErrors);

    }, [name])

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitted(true)

        const payload = {
            'id': alarmlist?.id,
            'name': name,
            'toggle': toggle
        }

        const data = await dispatch(updateAlarmlist(payload))

        if (data && data.errors) {
            setErrors(data.errors)
            setIsEditing(true)
        } else {
            setIsSubmitted(false)
            setIsEditing(!isEditing)
            setOpenSettings(false)
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
                        style={{backgroundColor: errors['name'] && isSubmitted ? '#FFA194' : ""}}
                    />
                    <div className='alarmlist-formError-ctn'>
                        {isSubmitted && <ErrorMessage error={errors.name} setClassName="alarmlist-error" />}
                    </div>
                    <div className='edit-alarmlist-form-btns'>
                        <div className='submit-alarmlist'>
                            <button type='submit'><span className="fa-solid fa-check"></span></button>
                        </div>
                        <div className='cancel-alarmlist'>
                            <button type='button' onClick={() => setIsEditing(!isEditing)}><span className="fa-solid fa-xmark"></span></button>
                        </div>
                    </div>
                </div>
            </form>
        </>
      );
}

export default EditAlarmlistForm
