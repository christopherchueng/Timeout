import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAlarmlists } from '../../../store/alarmlist'
import { createAlarm } from '../../../store/alarm'
import './CreateAlarm.css'

const CreateAlarm = () => {
    let todaysDate = new Date()
    const history = useHistory()
    const dispatch = useDispatch()
    const alarmlistsObj = useSelector(state => state?.alarmlist?.entries)
    const alarmlistsArr = Object.values(alarmlistsObj).sort()

    const [name, setName] = useState('Alarm')
    const [hour, setHour] = useState((todaysDate.getHours() + 24) % 12 || 12)
    const [minutes, setMinutes] = useState(todaysDate.getMinutes())
    const [meridiem, setMeridiem] = useState(todaysDate.getHours() >= 12 ? 'PM' : 'AM')
    const [repeat, setRepeat] = useState([])
    const [snooze, setSnooze] = useState(false)
    const [alarmlist, setAlarmlist] = useState([])
    const [errors, setErrors] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)
    let repeatDays = new Set()
    let addToAlarmlist = new Set()

    useEffect(() => {
        dispatch(getAlarmlists())
    }, [dispatch])

    const onClickAlarmlist = (e) => {
        !addToAlarmlist.has(e.target.value) ? addToAlarmlist.add(e.target.value) : addToAlarmlist.delete(e.target.value)
        console.log('ADDING TO ALARMLIST', addToAlarmlist)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setRepeat([...repeatDays])

        if (alarmlist.length === 0) {
            setAlarmlist([1])
        } else {
            setAlarmlist([...addToAlarmlist])
        }

        const payload = {
            name,
            hour,
            minutes,
            meridiem,
            repeat,
            snooze,
            alarmlist_id: alarmlist[0]
        }

        const alarm = dispatch(createAlarm(payload))

        if (alarm) {
            setName('Alarm')
            setHour((todaysDate.getHours() + 24) % 12 || 12)
            setMinutes(todaysDate.getMinutes())

        }

    }

    return (
        <div className='create-alarm'>
            <form onSubmit={onSubmit}>
                <div className='alarm-hour'>
                    <select
                        name='hour'
                        value={hour}
                        // defaultValue={(todaysDate.getHours() + 24) % 12 || 12}
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
                <div className='alarm-minutes'>
                    <select
                        name='minutes'
                        value={minutes}
                        // defaultValue={todaysDate.getMinutes()}
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
                <div className='alarm-meridiem'>
                    <select
                        name='meridiem'
                        value={meridiem}
                        // defaultValue={todaysDate.getHours() >= 12 ? 'PM' : 'AM'}
                        onChange={e => setMeridiem(e.target.value)}
                    >
                        <option value='AM'>AM</option>
                        <option value='PM'>PM</option>
                    </select>
                </div>
                <div className='alarm-name'>
                    <div className='alarm-name-label'>
                        Name
                    </div>
                    <div className='alarm-name-input'>
                        <input
                            name='name'
                            type='text'
                            defaultValue={'Alarm'}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className='alarm-repeat'>
                    <select
                        name='repeat'
                        defaultValue={[]}
                        multiple={true}
                        onClick={e => !repeatDays.has(e.target.value) ? repeatDays.add(e.target.value) : repeatDays.delete(e.target.value)}
                    >
                        <option value='Sunday'>Sunday</option>
                        <option value='Monday'>Monday</option>
                        <option value='Tuesday'>Tuesday</option>
                        <option value='Wednesday'>Wednesday</option>
                        <option value='Thursday'>Thursday</option>
                        <option value='Friday'>Friday</option>
                        <option value='Saturday'>Saturday</option>
                    </select>
                </div>
                <div className='alarm-snooze'>
                    <label htmlFor='snooze'>Snooze</label>
                    <input
                        name='snooze'
                        type='checkbox'
                        value={snooze}
                        onChange={e => setSnooze(e.target.value)}
                    />
                </div>
                <div className='add-to-alarmlist'>
                    <select
                        name='alarmlist'
                        value={alarmlist}
                        // defaultValue={[1]}
                        multiple={true}
                        onClick={e => onClickAlarmlist(e)}
                        // onClick={e => !addToAlarmlist.has(e.target.value) ? addToAlarmlist.add(e.target.value) : addToAlarmlist.delete(e.target.value)}

                    >
                        {alarmlistsArr && alarmlistsArr.map(alarmlist => (
                            <option value={alarmlist.id} key={alarmlist.id}>{alarmlist.name}</option>
                        ))}
                    </select>
                </div>
                <div className='create-alarm-submit'>
                    <button type='submit'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default CreateAlarm
