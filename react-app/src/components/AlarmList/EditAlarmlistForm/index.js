import React, { useState, useEffect } from "react"
import { useDispatch } from 'react-redux'
import { updateAlarmlist } from '../../../store/alarmlist'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'
import './EditAlarmlistForm.css'

const EditAlarmlistForm = ({ isEditing, setIsEditing, alarmlist, setOpenSettings }) => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [toggle, setToggle] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setName(alarmlist?.name)
        setToggle(alarmlist?.toggle)
    }, [])

    useEffect(() => {
        const validationErrors = {}
        if (name === 'Default') {
            validationErrors.name = 'Please choose a different alarmlist name.'
        }

        if (name.length > 100) {
            validationErrors.name = 'Please select a name up to 100 characters long.'
        }

        setErrors(validationErrors)

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

    const onClick = () => {
        setIsEditing(!isEditing)
        setOpenSettings(false)
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className='dashboard-alarmlist-input'>
                    <div className='cancel-alarmlist-edit'>
                        <button type='button' className="cancel-alarmlist-edit-btn" onClick={onClick}>
                            <span className="fa-solid fa-xmark fa-xl"></span>
                        </button>
                    </div>
                    {/* -------------------- NAME -------------------- */}
                    <input
                        name={'name'}
                        type='text'
                        value={name}
                        placeholder='Name'
                        onChange={(e) => setName(e.target.value)}
                        className='update-alarmlist-textbox'
                        style={{backgroundColor: errors['name'] && isSubmitted ? '#FFA194' : ""}}
                    />
                    <div className='edit-alarmlist-form-btns'>
                        <div className='submit-alarmlist-edit'>
                            <button type='submit' className='submit-alarmlist-edit-btn'><span className="fa-solid fa-check fa-xl"></span></button>
                        </div>
                    </div>
                </div>
                <div className='alarmlist-formError-ctn'>
                    {isSubmitted && <ErrorMessage error={errors.name} setClassName="alarmlist-error" />}
                </div>
            </form>
        </>
      )
}

export default EditAlarmlistForm
