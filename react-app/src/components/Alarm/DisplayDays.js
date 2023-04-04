import { useMemo } from 'react'

const DisplayDays = ({ alarmDays }) => {
    const oneDay = useMemo(() => (alarmDays.length === 1), [alarmDays.length])
    const everyWeekday = useMemo(() => (
        alarmDays.length === 5 && alarmDays.every(day => day.id !== 0 && day.id !== 6)
    ), [alarmDays])
    const everyWeekend = useMemo(() => (
        alarmDays.length === 2 && alarmDays.every(day => day.id === 0 || day.id === 6)
    ), [alarmDays])
    const everyDay = useMemo(() => (alarmDays.length === 7), [alarmDays.length])

    return (
        <>
            <div className='selected-day'>
                {oneDay ? `every ${alarmDays[0].name}` :
                everyWeekday ? 'every weekday' :
                everyWeekend ? 'every weekend' :
                everyDay ? 'every day' :
                alarmDays && alarmDays.map(day => (
                    <div key={day.id}>
                        {day.short}
                    </div>
                ))}
            </div>
        </>
    )
}

export default DisplayDays
