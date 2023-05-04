export const displayDaysOfTheWeek = (time) => {
    const [todaysDay] = time.split(' ')

    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    return (
        days.map((day) => (
            <div key={day} style={{color: day === todaysDay.toUpperCase() && '#3478F6'}}>{day}</div>
        ))
    )
}

export const selectOptions = (min, max, showLeadingZero) => {
    const options = []

    for (let i = min; i <= max; i++) {
        showLeadingZero && i < 10 ? options.push(`0${i}`) : options.push(i)
    }

    return (
        options.map(value => (
            <option value={value}>{value}</option>
        ))
    )
}
