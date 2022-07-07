from app.models import db, Alarm, Days

def seed_alarms();
    alarm1 = Alarm(
        name='Alarm',
        hour=9
        minutes=00,
        meridiem='PM',
        alarmlist_id=1
    )
    alarm2 = Alarm(
        name='Laundry',
        hour=1,
        minutes=15,
        meridiem='PM',
        alarmlist_id=1
    )
    alarm3 = Alarm(
        name='Pick friend up from airport',
        hour=7,
        minutes=00,
        meridiem='AM',
        alarmlist_id=1
    )
    alarm4 = Alarm(
        name='Wake up!',
        hour=7,
        minutes=00,
        meridiem='AM',
        repeat=[Days.MONDAY.value, Days.TUESDAY.value, Days.WEDNESDAY.value, Days.THURSDAY.value, Days.FRIDAY.value]
        alarmlist_id=2
    )
    alarm5 = Alarm(
        name='Clock in',
        hour=8,
        minutes=30,
        meridiem='AM',
        repeat=[Days.MONDAY.value, Days.TUESDAY.value, Days.WEDNESDAY.value, Days.THURSDAY.value, Days.FRIDAY.value]
        alarmlist_id=2
    )
    alarm6 = Alarm(
        name='Break',
        hour=12,
        minutes=30,
        meridiem='PM',
        repeat=[Days.MONDAY.value, Days.TUESDAY.value, Days.WEDNESDAY.value, Days.THURSDAY.value, Days.FRIDAY.value]
        alarmlist_id=2
    )
    alarm7 = Alarm(
        name='Break over',
        hour=1,
        minutes=30,
        meridiem='PM',
        repeat=[Days.MONDAY.value, Days.TUESDAY.value, Days.WEDNESDAY.value, Days.THURSDAY.value, Days.FRIDAY.value]
        alarmlist_id=2
    )
    alarm8 = Alarm(
        name='Clock out',
        hour=5,
        minutes=30,
        meridiem='PM',
        repeat=[Days.MONDAY.value, Days.TUESDAY.value, Days.WEDNESDAY.value, Days.THURSDAY.value, Days.FRIDAY.value]
        alarmlist_id=2
    )
    alarm9 = Alarm(
        name='Check in',
        hour=11,
        minutes=00,
        meridiem='AM',
        repeat=[Days.MONDAY.value, Days.TUESDAY.value, Days.WEDNESDAY.value, Days.THURSDAY.value, Days.FRIDAY.value]
        alarmlist_id=3
    )
    alarm10 = Alarm(
        name='Break',
        hour=2,
        minutes=15,
        meridiem='PM',
        repeat=[Days.MONDAY.value, Days.TUESDAY.value, Days.WEDNESDAY.value, Days.THURSDAY.value, Days.FRIDAY.value]
        alarmlist_id=3
    )
    alarm11 = Alarm(
        name='Check in',
        hour=3,
        minutes=30,
        meridiem='PM',
        repeat=[Days.MONDAY.value, Days.TUESDAY.value, Days.WEDNESDAY.value, Days.THURSDAY.value, Days.FRIDAY.value]
        alarmlist_id=3
    )
    alarm12 = Alarm(
        name='Break',
        hour=5,
        minutes=45,
        meridiem='PM',
        repeat=[Days.MONDAY.value, Days.TUESDAY.value, Days.WEDNESDAY.value, Days.THURSDAY.value, Days.FRIDAY.value]
        alarmlist_id=3
    )
    alarm13 = Alarm(
        name='Check in',
        hour=6,
        minutes=00,
        meridiem='PM',
        repeat=[Days.MONDAY.value, Days.TUESDAY.value, Days.WEDNESDAY.value, Days.THURSDAY.value, Days.FRIDAY.value]
        alarmlist_id=3
    )
    alarm14 = Alarm(
        name='Evening report',
        hour=8,
        minutes=00,
        meridiem='PM',
        repeat=[Days.MONDAY.value, Days.TUESDAY.value, Days.WEDNESDAY.value, Days.THURSDAY.value, Days.FRIDAY.value]
        alarmlist_id=3
    )
    alarm15 = Alarm(
        name='First wake up',
        hour=6,
        minutes=00,
        meridiem='AM',
        repeat=[Days.MONDAY.value, Days.TUESDAY.value, Days.WEDNESDAY.value, Days.THURSDAY.value, Days.FRIDAY.value]
        alarmlist_id=4
    )
    alarm16 = Alarm(
        name="3rd time's the charm",
        hour=6,
        minutes=10,
        meridiem='AM',
        repeat=[Days.MONDAY.value, Days.TUESDAY.value, Days.WEDNESDAY.value, Days.THURSDAY.value, Days.FRIDAY.value]
        alarmlist_id=4
    )
    alarm17 = Alarm(
        name="YOURE KIDDING",
        hour=6,
        minutes=15,
        meridiem='AM',
        repeat=[Days.MONDAY.value, Days.TUESDAY.value, Days.WEDNESDAY.value, Days.THURSDAY.value, Days.FRIDAY.value]
        alarmlist_id=4
    )
    alarm18 = Alarm(
        name="YOURE KIDDING",
        hour=6,
        minutes=15,
        meridiem='AM',
        repeat=[Days.MONDAY.value, Days.TUESDAY.value, Days.WEDNESDAY.value, Days.THURSDAY.value, Days.FRIDAY.value]
        alarmlist_id=4
    )
    alarm19 = Alarm(
        name="I can't help you at this point",
        hour=6,
        minutes=20,
        meridiem='AM',
        repeat=[Days.MONDAY.value, Days.TUESDAY.value, Days.WEDNESDAY.value, Days.THURSDAY.value, Days.FRIDAY.value]
        alarmlist_id=4
    )
    alarm20 = Alarm(
        name="You're definitely going to be late",
        hour=6,
        minutes=25,
        meridiem='AM',
        repeat=[Days.MONDAY.value, Days.TUESDAY.value, Days.WEDNESDAY.value, Days.THURSDAY.value, Days.FRIDAY.value]
        alarmlist_id=4
    )
    alarm21 = Alarm(
        name="Last chance",
        hour=6,
        minutes=30,
        meridiem='AM',
        repeat=[Days.MONDAY.value, Days.TUESDAY.value, Days.WEDNESDAY.value, Days.THURSDAY.value, Days.FRIDAY.value]
        alarmlist_id=4
    )
    alarm22 = Alarm(
        name="Basketball",
        hour=9,
        minutes=00,
        meridiem='AM',
        repeat=Days.SUNDAY.value
        alarmlist_id=1
    )
    alarm23 = Alarm(
        name="Basketball",
        hour=7,
        minutes=00,
        meridiem='AM',
        repeat=Days.SUNDAY.value
        alarmlist_id=1
    )

    db.session.add(independent_alarms)
    db.session.add(work_alarmlist)
    db.session.add(school_alarmlist)
    db.session.add(sleep_alarmlist)

    db.session.commit()

def undo_alarms():
    db.session.execute('TRUNCATE alarms RESTART IDENTITY CASCADE')
    db.session.commit()
