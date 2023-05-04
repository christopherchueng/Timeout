import { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAlarmlists } from '../../../store/alarmlist'
import { createAlarm } from '../../../store/alarm'
import Multiselect from 'multiselect-react-dropdown'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'
import { DAYS } from '../constants'
import { selectOptions } from '../../utils'

import './CreateAlarm.css'

const CreateAlarm = () => {
    const todaysDate = new Date()
    const history = useHistory()
    const dispatch = useDispatch()
    const alarmlists = useSelector(state => Object.values(state?.alarmlist?.entries).sort())

    const [name, setName] = useState('Alarm')
    const [hour, setHour] = useState('')
    const [minutes, setMinutes] = useState('')
    const [meridiem, setMeridiem] = useState('')
    const [repeat, setRepeat] = useState('')
    const [snooze, setSnooze] = useState('')
    const [alarmlist, setAlarmlist] = useState(alarmlists[0]?.id)
    const [errors, setErrors] = useState({})
    const [nameFocus, setNameFocus] = useState(false)
    const [nameLength, setNameLength] = useState(0)


    useEffect(() => {
        dispatch(getAlarmlists())
    }, [dispatch])

    useEffect(() => {
        setHour((todaysDate.getHours() + 24) % 12 || 12)
        setMinutes(todaysDate.getMinutes())
        setMeridiem(todaysDate.getHours() >= 12 ? 'PM' : 'AM')
        setSnooze(false)
    }, [])

    useEffect(() => {
        const validationErrors = {}
        if (!name) {
            validationErrors.name = 'Please provide an alarm name.'
        }
        if (name.length > 150) {
            validationErrors.name = 'Please provide a name that is at most 150 characters long.'
        }
        if (!alarmlists.length) {
            validationErrors.alarmlist = 'You currently do not have any alarmlists! Please create an alarmlist first!'
        }

        setErrors(validationErrors)
    }, [name, alarmlists.length])

    useEffect(() => {
        setNameLength(name.length)
    }, [name])

    /* ---------------------- START MULTISELECT INFO ---------------------- */

    const onSelect = useCallback((selectedList) => {
        const daysSelected = selectedList.map(day => day.id)
        setRepeat(daysSelected)
    }, [setRepeat])

    /* ---------------------- END MULTISELECT INFO ---------------------- */

    const onSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            name,
            hour,
            'minutes': `${minutes}`,
            meridiem,
            'repeat': `${repeat}`,
            snooze,
            'toggle': true,
            'alarmlist_id': +alarmlist
        }

        const errorData = await dispatch(createAlarm(payload))
        if (errorData && errorData.errors) {
            setErrors(errorData)
        } else {
            setName('Alarm')
            setHour((todaysDate.getHours() + 24) % 12 || 12)
            setMinutes(todaysDate.getMinutes())
            setRepeat([])
            setSnooze(false)
            setAlarmlist(alarmlists[0]?.id)
            setErrors({})
            history.push(`/dashboard`)
        }
    }

    return (
        <div id='create-alarm'>
            <h1 className='alarm-form-title'>Add Alarm</h1>
            {errors.error && <ErrorMessage error={errors.error} setClassName='error-500' />}
            <form onSubmit={onSubmit}>
                <div className='create-left'>
                    <div className='select-times-and-meridiem'>
                        {/* ------------------------- HOUR ------------------------- */}
                        <div className='alarm-hour-form'>
                            <select
                                name='hour'
                                value={hour}
                                size='7'
                                onChange={e => setHour(+(e.target.value))}
                            >
                                <option disabled style={{'cursor': 'default'}}>-</option>
                                {selectOptions(1, 12, false)}
                                <option disabled style={{'cursor': 'default'}}>-</option>
                            </select>
                        </div>
                        <div className='time-colon-ctn'><span className='time-colon'>:</span></div>
                        {/* ------------------------- MINUTES ------------------------- */}
                        <div className='alarm-minutes-form'>
                            <select
                                name='minutes'
                                value={minutes}
                                size='7'
                                onChange={e => setMinutes(+(e.target.value))}
                            >
                                <option disabled style={{'cursor': 'default'}}>-</option>
                                {selectOptions(0, 59, true)}
                                <option disabled style={{'cursor': 'default'}}>-</option>
                            </select>
                        </div>
                        {/* ------------------------- MERIDIEM ------------------------- */}
                        <div className='alarm-meridiem-form'>
                            <select
                                name='meridiem'
                                value={meridiem}
                                size='2'
                                onChange={e => setMeridiem(e.target.value)}
                            >
                                <option value='AM'>AM</option>
                                <option value='PM'>PM</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='create-right'>

                    {/* ------------------------- NAME ------------------------- */}
                    <div className='alarm-name-form'>
                        <div className='alarm-name-label'>
                            <label htmlFor='name'>Name</label>
                        </div>
                        <div className='flex flex-col pt-2'>
                            <div className='alarm-name-input'>
                                <input
                                    name='name'
                                    type='text'
                                    className='name-input-box'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    onClick={() => setNameFocus(true)}
                                    onBlur={() => setNameFocus(false)}
                                    style={{backgroundColor: errors['name'] ? '#FFA194' : ""}}
                                />
                            </div>
                            <div className='name-char-count'>
                                {nameFocus
                                ?
                                <div className='char-count-ctn'>
                                    {nameLength > 150
                                    ?   <div className='char-count-cmt' style={{color: 'red', width: '70px'}}>
                                            <span>{nameLength} / 150</span>
                                        </div>
                                    :   <div className='char-count-cmt'>
                                            <span>{nameLength} / 150</span>
                                        </div>}
                                </div>
                                : ''
                                }
                            </div>
                        </div>
                    </div>
                    <div className='alarm-formError-ctn'>
                        {<ErrorMessage error={errors.name} setClassName="alarmlist-name-error" />}
                    </div>
                    {/* ------------------------- ADD TO ALARMLIST ------------------------- */}
                    <div className='add-to-alarmlist-form'>
                        <div className='alarm-alarmlist-label'>
                            <label htmlFor='alarmlist'>Add to Alarmlist</label>
                        </div>
                        <div className='flex align-center'>
                            <select
                                name='alarmlist'
                                value={alarmlist}
                                onChange={e => setAlarmlist(e.target.value)}
                                className='alarmlist-selection-form'
                                style={{backgroundColor: errors['alarmlist'] ? '#FFA194' : ""}}
                            >
                                {alarmlists && alarmlists.map(alarmlist => (
                                    <option value={+(alarmlist.id)} key={+(alarmlist.id)}>{alarmlist.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='alarm-formError-ctn'>
                        {<ErrorMessage error={errors.alarmlist} setClassName="select-alarmlist-error" />}
                    </div>
                    {/* ------------------------- REPEAT ------------------------- */}
                    <div className='alarm-repeat-form'>
                        <div className='alarm-repeat-label'>
                            <label htmlFor='repeat'>Repeat</label>
                        </div>
                        <div className='alarm-repeat-select'>
                            <Multiselect
                                options={DAYS}
                                onSelect={onSelect}
                                onRemove={onSelect}
                                displayValue="name"
                                placeholder='Never'
                                hidePlaceholder={repeat.length}
                                avoidHighlightFirstOption={true}
                                closeIcon='cancel'
                                style={{
                                    searchBox: {
                                        width: '350px',
                                        border: '1px solid lightgray',
                                        borderRadius: '25px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        textAlign: 'right',
                                        alignItems: 'flex-end',
                                    },
                                    optionContainer: {
                                        fontFamily: 'Lexend Deca',
                                        fontWeight: '1000'
                                    },
                                    inputField: {
                                        cursor: 'pointer',
                                        paddingRight: '20px',
                                        textAlign: 'right',
                                        fontFamily: 'Lexend Deca',
                                        fontWeight: '1000',
                                        color: '#3478F6',
                                        fontSize: '14pt'
                                    },
                                    chips: {
                                        fontFamily: 'Readex Pro',
                                        backgroundColor: 'transparent',
                                        color: '#3478F6',
                                        paddingRight: '0',
                                        marginRight: '0',
                                        fontSize: '14pt'
                                    },
                                }}
                            />
                        </div>
                    </div>
                    {/* ------------------------- SNOOZE ------------------------- */}
                    <div className='alarm-snooze-form'>
                        <div className='alarm-snooze-label'>
                            <label htmlFor='snooze'>Snooze</label>
                        </div>
                        <div className='alarm-snooze-input'>
                            <label className='snooze-switch'>
                                <input
                                    name='snooze'
                                    type='checkbox'
                                    value={snooze}
                                    className='snooze-radio-box'
                                    onClick={() => setSnooze(!snooze)}
                                />
                                <div className='snooze-slider snooze-ball'>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className='create-alarm-submit'>
                        <button
                            type='submit'
                            disabled={Object.values(errors).length !== 0}
                            className='submit-alarmlist-switch'
                        >
                            <span className="submit-alarmlist-span">Save</span>
                            <div className='submit-alarmlist-ball'></div>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateAlarm
