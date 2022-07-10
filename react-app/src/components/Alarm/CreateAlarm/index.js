import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAlarmlists, getDefaultAlarmlist } from '../../../store/alarmlist'
import { createAlarm } from '../../../store/alarm'
import Multiselect from 'multiselect-react-dropdown'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'
import './CreateAlarm.css'

const CreateAlarm = () => {
    let todaysDate = new Date()
    const history = useHistory()
    const dispatch = useDispatch()
    const alarmlistsObj = useSelector(state => state?.alarmlist?.entries)
    const alarmlistsArr = Object.values(alarmlistsObj).sort()
    const defaultAlarmlist = useSelector(state => state?.alarmlist?.default)
    const defaultAlarmlistArr = Object.values(defaultAlarmlist)

    const [name, setName] = useState('Alarm')
    const [hour, setHour] = useState((todaysDate.getHours() + 24) % 12 || 12)
    const [minutes, setMinutes] = useState(todaysDate.getMinutes())
    const [meridiem, setMeridiem] = useState(todaysDate.getHours() >= 12 ? 'PM' : 'AM')
    const [sound, setSound] = useState('')
    const [repeat, setRepeat] = useState([])
    const [snooze, setSnooze] = useState(false)
    // const [alarmlist, setAlarmlist] = useState(defaultAlarmlistArr[0]?.id)
    const [alarmlist, setAlarmlist] = useState(1)
    const [errors, setErrors] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [nameFocus, setNameFocus] = useState(false)
    const [messageCount, setMessageCount] = useState(0)

    useEffect(() => {
        dispatch(getAlarmlists())
        dispatch(getDefaultAlarmlist())
    }, [dispatch])

    useEffect(() => {
        const validationErrors = {}
        if (!name) {
            validationErrors.name = 'Please provide an alarm name.'
        }
        if (name.length > 150) {
            validationErrors.name = 'Please provide a name that is at most 150 characters long.'
        }

        setErrors(validationErrors)
    }, [name])

    useEffect(() => {
        setMessageCount(name.length)
    }, [name])

    /* ---------------------- START MULTISELECT INFO ---------------------- */
    let days = {
        options: [
            {name: 'Sunday', id: 0},
            {name: 'Monday', id: 1},
            {name: 'Tuesday', id: 2},
            {name: 'Wednesday', id: 3},
            {name: 'Thursday', id: 4},
            {name: 'Friday', id: 5},
            {name: 'Saturday', id: 6}
        ]
    }

    const onSelect = (selectedList, selectedItem) => {
        const daysSelected = selectedList.map(day => day.id)
        setRepeat(daysSelected)
    }
    /* ---------------------- END MULTISELECT INFO ---------------------- */

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitted(true)

        const payload = {
            name,
            hour,
            minutes,
            meridiem,
            sound,
            repeat: repeat.toString(),
            snooze,
            alarmlist_id: parseInt(alarmlist)
        }

        const alarm = await dispatch(createAlarm(payload))
        if (alarm) {
            setErrors(alarm)
        }

        if (alarmlist === 1 && !errors) {
            setName('Alarm')
            setHour((todaysDate.getHours() + 24) % 12 || 12)
            setMinutes(todaysDate.getMinutes())
            setSound('')
            setRepeat([])
            setSnooze(false)
            setAlarmlist(1)
            setIsSubmitted(false)
            setErrors({})
            history.push('/dashboard')
        } else if (alarmlist !== 1 && !errors) {
            console.log('hello what is this alarmlist', alarmlist)
            setName('Alarm')
            setHour((todaysDate.getHours() + 24) % 12 || 12)
            setMinutes(todaysDate.getMinutes())
            setSound('')
            setRepeat([])
            setSnooze(false)
            setAlarmlist(1)
            setIsSubmitted(false)
            setErrors({})
            history.push(`/alarmlists/${alarmlist}`)
        }

    }

    return (
        <div className='create-alarm'>
            <h1>Add Alarm</h1>
            <form onSubmit={onSubmit}>
                {/* ------------------------- HOUR ------------------------- */}
                <div className='alarm-hour'>
                    <select
                        name='hour'
                        value={hour}
                        onChange={e => setHour(parseInt(e.target.value))}
                    >
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
                    </select>
                </div>
                {/* ------------------------- MINUTES ------------------------- */}
                <div className='alarm-minutes'>
                    <select
                        name='minutes'
                        value={minutes}
                        onChange={e => setMinutes(parseInt(e.target.value))}
                    >
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
                        <option value='60'>60</option>
                    </select>
                </div>
                {/* ------------------------- MERIDIEM ------------------------- */}
                <div className='alarm-meridiem'>
                    <select
                        name='meridiem'
                        value={meridiem}
                        onChange={e => setMeridiem(e.target.value)}
                    >
                        <option value='AM'>AM</option>
                        <option value='PM'>PM</option>
                    </select>
                </div>
                {/* ------------------------- NAME ------------------------- */}
                <div className='alarm-name'>
                    <div className='alarm-name-label'>
                        <label htmlFor='name'>Name</label>
                    </div>
                    <div className='alarm-name-input'>
                        <input
                            name='name'
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            onClick={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}
                        />
                    </div>
                    <div className='name-char-count'>
                        {nameFocus
                        ?
                        <>
                            {messageCount > 150
                            ?   <div className='char-count-cmt' style={{color: 'red', width: '70px'}}>
                                    <span>{messageCount} / 150</span>
                                </div>
                            :   <div className='char-count-cmt'>
                                    <span>{messageCount} / 150</span>
                                </div>}
                        </>
                        : ''
                        }
                    </div>
                </div>
                <div className='alarm-formError-ctn'>
                    {isSubmitted && <ErrorMessage error={errors.name} setClassName="alarmlist-name-error" />}
                </div>
                {/* ------------------------- ADD TO ALARMLIST ------------------------- */}
                <div className='add-to-alarmlist'>
                    <div className='alarm-alarmlist-label'>
                        <label htmlFor='alarmlist'>Add to Alarmlist</label>
                    </div>
                    <div className='alarm-alarmlist-select'>
                        <select
                            name='alarmlist'
                            value={alarmlist}
                            onChange={e => setAlarmlist(e.target.value)}
                        >
                            <option value={defaultAlarmlistArr[0]?.id}>None</option>
                            {alarmlistsArr && alarmlistsArr.map(alarmlist => (
                                <option value={parseInt(alarmlist.id)} key={parseInt(alarmlist.id)}>{alarmlist.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* ------------------------- SOUND ------------------------- */}
                <div className='alarm-sound'>
                    <div className='alarm-sound-label'>
                        <label htmlFor='sound'>Sound</label>
                    </div>
                    <div className='alarm-sound-input'>
                        sound AWS here...
                    </div>
                </div>
                {/* ------------------------- REPEAT ------------------------- */}
                <div className='alarm-repeat'>
                    <div className='alarm-repeat-label'>
                        <label htmlFor='repeat'>Repeat</label>
                    </div>
                    <div className='alarm-repeat-select'>
                        <Multiselect
                            options={days.options}
                            onSelect={onSelect}
                            onRemove={onSelect}
                            showCheckbox={true}
                            displayValue="name"
                            placeholder={'Never'}
                            hidePlaceholder={repeat.length}
                            avoidHighlightFirstOption={true}
                            showArrow={true}
                        />
                    </div>
                </div>
                {/* ------------------------- SNOOZE ------------------------- */}
                <div className='alarm-snooze'>
                    <div className='alarm-snooze-label'>
                        <label htmlFor='snooze'>Snooze</label>
                    </div>
                    <div className='alarm-snooze-input'>
                        <input
                            name='snooze'
                            type='checkbox'
                            value={snooze}
                            onChange={e => setSnooze(e.target.value)}
                        />
                    </div>
                </div>
                <div className='create-alarm-submit'>
                    <button type='submit' disabled={Object.values(errors).length !== 0}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default CreateAlarm
