import { useState, useEffect, useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAlarmlists } from '../../../store/alarmlist'
import { getAlarm, updateAlarm } from '../../../store/alarm'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'
import Multiselect from 'multiselect-react-dropdown'
import { DAYS } from '../constants'
import { selectOptions } from '../../utils'

import './EditAlarm.css'

const EditAlarm = () => {
    const { id } = useParams()
    const todaysDate = new Date()
    const history = useHistory()
    const dispatch = useDispatch()
    const alarmlists = useSelector(state => Object.values(state?.alarmlist?.entries).sort())
    const alarmObj = useSelector(state => state?.alarm?.entries)
    const alarm = alarmObj[+id]

    const [name, setName] = useState('')
    const [hour, setHour] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [meridiem, setMeridiem] = useState('')
    const [repeat, setRepeat] = useState([])
    const [sound, setSound] = useState('')
    const [snooze, setSnooze] = useState('')
    const [alarmlist, setAlarmlist] = useState(0)
    const [errors, setErrors] = useState({})
    const [nameFocus, setNameFocus] = useState(false)
    const [messageCount, setMessageCount] = useState(alarm?.name?.length)

    useEffect(() => {
        dispatch(getAlarm(+id))
        dispatch(getAlarmlists())
    }, [dispatch, id])

    useEffect(() => {
        setName(alarm?.name)
        setHour(alarm?.hour)
        setMinutes(alarm?.minutes)
        setMeridiem(alarm?.meridiem)
        setSound(alarm?.sound)
        setSnooze(alarm?.snooze)
        setRepeat(alarm?.repeat)
        setAlarmlist(alarm?.alarmlistId)
    }, [alarm])

    useEffect(() => {
        const validationErrors = {}
        if (!name) {
            validationErrors.name = 'Please provide an alarm name.'
        }
        if (name?.length > 150) {
            validationErrors.name = 'Please provide a name that is at most 150 characters long.'
        }
        if (!alarmlists.length) {
            validationErrors.alarmlist = 'You currently do not have any alarmlists! Please create an alarmlist first!'
        }

        setErrors(validationErrors)
    }, [name, alarmlists.length])

    useEffect(() => {
        setMessageCount(name?.length)
    }, [name, id])

    /* ---------------------- START MULTISELECT INFO ---------------------- */

    const onSelect = useCallback((selectedList) => {
        const daysSelected = selectedList.map(day => day.id)
        setRepeat(daysSelected)
    }, [setRepeat])

    /* ---------------------- END MULTISELECT INFO ---------------------- */

    const onSubmit = async (e) => {
        e.preventDefault()

        const newRepeat = repeat ?
        repeat.map(day => {
            if (typeof day === 'object') {
                return day.id
            }
            if (typeof day === 'number') {
                return day
            }
        })
        : []

        const payload = {
            'alarm_id': +id,
            name,
            hour,
            'minutes': `${minutes}`,
            meridiem,
            sound,
            'repeat': JSON.stringify(newRepeat).replace(/[\[\]']+/g,''),
            snooze,
            'toggle': true,
            'alarmlist_id': +alarmlist
        }

        const errorData = await dispatch(updateAlarm(payload))
        if (errorData && errorData.errors) {
            setErrors(errorData)
        } else {
            setName('Alarm')
            setHour((todaysDate.getHours() + 24) % 12 || 12)
            setMinutes(todaysDate.getMinutes())
            setSound('')
            setRepeat([])
            setSnooze('')
            setAlarmlist(alarmlists[0]?.id)
            setErrors({})
            history.push(`/dashboard`)
            // history.push(`/alarmlists/${alarmlist}`)
        }
    }

    return (
        <div id='edit-alarm'>
            <h1 className='alarm-form-title'>Edit Alarm</h1>
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
                                <div className='name-char-count'>
                                    {nameFocus && name
                                    ?
                                    <div className='char-count-ctn'>
                                        {messageCount > 150 && name
                                        ?   <div className='char-count-cmt' style={{color: 'red', width: '70px'}}>
                                                <span>{name?.length} / 150</span>
                                            </div>
                                        :   <div className='char-count-cmt'>
                                                <span>{name?.length} / 150</span>
                                            </div>}
                                    </div>
                                    : ''
                                    }
                                </div>
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
                                    <option value={+(alarmlist?.id)} key={+(alarmlist?.id)}>{alarmlist?.name}</option>
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
                                selectedValues={alarm?.repeat}
                                placeholder={'Never'}
                                avoidHighlightFirstOption={true}
                                hidePlaceholder={repeat?.length}
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
                                    checked={snooze}
                                    className='snooze-radio-box'
                                    onChange={() => setSnooze(!snooze)}
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

export default EditAlarm
