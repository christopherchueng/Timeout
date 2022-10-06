const DisplayDays = ({ alarmDays }) => {
    const weekdays = [1, 2, 3, 4, 5]
    const weekends = [0, 6]

    const oneDay = alarmDays.length === 1
    const everyWeekday = alarmDays.every(day => weekdays.includes(day.id))
    const everyWeekend = alarmDays.every(day => weekends.includes(day.id))
    const everyDay = alarmDays.length === 7

    if (oneDay) return `every ${alarmDays[0].name}`
    if (everyWeekday) return 'every weekday'
    if (everyWeekend) return 'every weekend'
    if (everyDay) return 'every day'

    return (
        <>
            {alarmDays && alarmDays.map(day => (
                <div className='selected-day' key={day.id}>
                    {oneDay ||
                    everyWeekday ||
                    everyWeekend ||
                    everyDay ||
                    (day.short)}
                </div>
            ))}
        </>
    )
}

export default DisplayDays
