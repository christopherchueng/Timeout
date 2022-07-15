const DisplayDays = ({ alarmDays }) => {
    const weekdays = [1, 2, 3, 4, 5]
    const weekends = [0, 6]
    let dayNums = []
    for (let day of alarmDays) {
        dayNums.push(day.id)
    }
    if (dayNums.every(day => weekdays.includes(day))) return 'every weekday'
    if (dayNums.every(day => weekends.includes(day))) return 'every weekend'
    if (dayNums.length === 7) return 'every day'

    return (
        <div>
            {alarmDays && alarmDays.map(day => (
                <div key={day.id}>
                    {(alarmDays.every(day => weekdays.includes(day)) ? 'every weekday' : '') ||
                    (alarmDays.every(day => weekends.includes(day))) ? 'every weekend' : '' ||
                    (alarmDays.length === 7) ? 'every day' : '' ||
                    (day.short)}
                </div>
            ))}
        </div>
    )
}

export default DisplayDays
