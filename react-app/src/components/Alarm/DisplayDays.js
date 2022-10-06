const DisplayDays = ({ alarmDays }) => {
    const weekdays = [1, 2, 3, 4, 5]
    const weekends = [0, 6]

    const oneDay = alarmDays.length === 1
    const everyWeekday = alarmDays.every(day => weekdays.includes(day.id))
    const everyWeekend = alarmDays.every(day => weekends.includes(day.id))
    const everyDay = alarmDays.length === 7

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
