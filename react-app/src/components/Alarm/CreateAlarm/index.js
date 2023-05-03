import { useState, useEffect, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAlarmlists } from '../../../store/alarmlist'
import { createAlarm } from '../../../store/alarm'
import Multiselect from 'multiselect-react-dropdown'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'
import { DAYS } from '../constants'

import './CreateAlarm.css'

const CreateAlarm = () => {
    const todaysDate = new Date()
    const history = useHistory()
    const dispatch = useDispatch()
    const alarmlistsObj = useSelector(state => state?.alarmlist?.entries)
    const alarmlistsArr = useMemo(() => Object.values(alarmlistsObj).sort(), [alarmlistsObj])

    const [name, setName] = useState('')
    const [hour, setHour] = useState('')
    const [minutes, setMinutes] = useState('')
    const [meridiem, setMeridiem] = useState('')
    const [repeat, setRepeat] = useState('')
    const [snooze, setSnooze] = useState('')
    const [alarmlist, setAlarmlist] = useState('')
    const [errors, setErrors] = useState({})
    const [nameFocus, setNameFocus] = useState(false)
    const [messageCount, setMessageCount] = useState(0)


    useEffect(() => {
        dispatch(getAlarmlists())
    }, [dispatch])

    useEffect(() => {
        setName('Alarm')
        setHour((todaysDate.getHours() + 24) % 12 || 12)
        setMinutes(todaysDate.getMinutes())
        setMeridiem(todaysDate.getHours() >= 12 ? 'PM' : 'AM')
        setSnooze(false)
        setAlarmlist(alarmlistsArr[0]?.id)
    }, [])

    useEffect(() => {
        const validationErrors = {}
        if (!name) {
            validationErrors.name = 'Please provide an alarm name.'
        }
        if (name.length > 150) {
            validationErrors.name = 'Please provide a name that is at most 150 characters long.'
        }
        if (!alarmlistsArr.length) {
            validationErrors.alarmlist = 'You currently do not have any alarmlists! Please create an alarmlist first!'
        }

        setErrors(validationErrors)
    }, [name, alarmlist])

    useEffect(() => {
        setMessageCount(name.length)
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
            setAlarmlist(alarmlistsArr[0]?.id)
            setErrors({})
            history.push(`/dashboard`)
            // history.push(`/alarmlists/${alarmlist}`)
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
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8'>8</option>
                                <option value='9'>9</option>
                                <option value='10'>10</option>
                                <option value='11'>11</option>
                                <option value='12'>12</option>
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
                                <option value='0'>00</option>
                                <option value='1'>01</option>
                                <option value='2'>02</option>
                                <option value='3'>03</option>
                                <option value='4'>04</option>
                                <option value='5'>05</option>
                                <option value='6'>06</option>
                                <option value='7'>07</option>
                                <option value='8'>08</option>
                                <option value='9'>09</option>
                                <option value='10'>10</option>
                                <option value='11'>11</option>
                                <option value='12'>12</option>
                                <option value='13'>13</option>
                                <option value='14'>14</option>
                                <option value='15'>15</option>
                                <option value='16'>16</option>
                                <option value='17'>17</option>
                                <option value='18'>18</option>
                                <option value='19'>19</option>
                                <option value='20'>20</option>
                                <option value='21'>21</option>
                                <option value='22'>22</option>
                                <option value='23'>23</option>
                                <option value='24'>24</option>
                                <option value='25'>25</option>
                                <option value='26'>26</option>
                                <option value='27'>27</option>
                                <option value='28'>28</option>
                                <option value='29'>29</option>
                                <option value='30'>30</option>
                                <option value='31'>31</option>
                                <option value='32'>32</option>
                                <option value='33'>33</option>
                                <option value='34'>34</option>
                                <option value='35'>35</option>
                                <option value='36'>36</option>
                                <option value='37'>37</option>
                                <option value='38'>38</option>
                                <option value='39'>39</option>
                                <option value='40'>40</option>
                                <option value='41'>41</option>
                                <option value='42'>42</option>
                                <option value='43'>43</option>
                                <option value='44'>44</option>
                                <option value='45'>45</option>
                                <option value='46'>46</option>
                                <option value='47'>47</option>
                                <option value='48'>48</option>
                                <option value='49'>49</option>
                                <option value='50'>50</option>
                                <option value='51'>51</option>
                                <option value='52'>52</option>
                                <option value='53'>53</option>
                                <option value='54'>54</option>
                                <option value='55'>55</option>
                                <option value='56'>56</option>
                                <option value='57'>57</option>
                                <option value='58'>58</option>
                                <option value='59'>59</option>
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
                        <div className='alarm-name-and-count'>
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
                                    {messageCount > 150
                                    ?   <div className='char-count-cmt' style={{color: 'red', width: '70px'}}>
                                            <span>{messageCount} / 150</span>
                                        </div>
                                    :   <div className='char-count-cmt'>
                                            <span>{messageCount} / 150</span>
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
                        <div className='alarm-alarmlist-select'>
                            <select
                                name='alarmlist'
                                value={alarmlist}
                                onChange={e => setAlarmlist(e.target.value)}
                                className='alarmlist-selection-form'
                                style={{backgroundColor: errors['alarmlist'] ? '#FFA194' : ""}}
                            >
                                {alarmlistsArr && alarmlistsArr.map(alarmlist => (
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
                                // showCheckbox={false}
                                displayValue="name"
                                placeholder='Never'
                                hidePlaceholder={repeat.length}
                                avoidHighlightFirstOption={true}
                                closeIcon='cancel'
                                style={{
                                    searchBox: {
                                        width: '150px',
                                        // border: '1px solid black',
                                        border: '0',
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
                                        padding: '0',
                                        textAlign: 'right',
                                        fontFamily: 'Lexend Deca',
                                        fontWeight: '1000',
                                        color: 'black',
                                        fontSize: '14pt'
                                    },
                                    chips: {
                                        fontFamily: 'Readex Pro',
                                        backgroundColor: 'transparent',
                                        color: '#3478F6',
                                        paddingRight: '0',
                                        marginRight: '0',
                                        fontSize: '12pt'
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
