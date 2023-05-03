export const displayDaysOfTheWeek = (time) => {
    const [todaysDay] = time.split(' ')

    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    return (
        days.map((day) => (
            <div key={day} style={{color: day === todaysDay.toUpperCase() && '#3478F6'}}>{day}</div>
        ))
    )
}
