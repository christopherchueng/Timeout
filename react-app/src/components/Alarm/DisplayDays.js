const DisplayDays = ({ alarmDays }) => {
    const weekdays = [1, 2, 3, 4, 5]
    const weekends = [0, 6]
    let dayNums = []
    for (let day of alarmDays) {
        dayNums.push(day.id)
    }
    if (alarmDays.length === 1) return `every ${alarmDays[0].name}`
    if (alarmDays.length === 5 && dayNums.every(day => weekdays.includes(day))) return 'every weekday'
    if (alarmDays.length === 2 && dayNums.every(day => weekends.includes(day))) return 'every weekend'
    if (dayNums.length === 7) return 'every day'

    return (
        <>
            {alarmDays && alarmDays.map(day => (
                <div className='selected-day' key={day.id}>
                    {(alarmDays.length === 1) ||
                    (alarmDays.length === 5 && alarmDays.every(day => weekdays.includes(day))) ||
                    (alarmDays.length === 2 && alarmDays.every(day => weekends.includes(day))) ||
                    (alarmDays.length === 7) ||
                    (day.short)}
                </div>
            ))}
        </>
    )
}

export default DisplayDays
