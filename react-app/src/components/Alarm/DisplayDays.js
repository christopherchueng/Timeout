const DisplayDays = ({ alarmDays }) => {
    // const weekdays = [1, 2, 3, 4, 5]
    // const weekends = [0, 6]

    const oneDay = alarmDays.length === 1
    const everyWeekday = alarmDays.length === 5 && alarmDays.every(day => day.id !== 0 && day.id !== 6)
    const everyWeekend = alarmDays.length === 2 && alarmDays.every(day => day.id === 0 || day.id === 6)
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
