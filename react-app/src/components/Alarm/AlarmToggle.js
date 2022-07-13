import { useState } from "react"

const AlarmToggle = ({ alarmOn, setAlarmOn }) => {
    return (
        <label className='alarm-switch'>
            <input
                type='checkbox'
                value={alarmOn}
                onClick={() => setAlarmOn(!alarmOn)}
                className='alarm-radio-box'
                checked={alarmOn}
            />
            <div className='alarm-slider alarm-ball'>
            </div>
        </label>
    )
}

export default AlarmToggle
