from app.models import db, Alarm

def seed_alarms():
    alarm1 = Alarm(
        name='Alarm',
        hour=9,
        minutes="0",
        meridiem='PM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat='',
        snooze=False,
        toggle=False,
        alarmlist_id=1
    )
    alarm2 = Alarm(
        name='Laundry',
        hour=1,
        minutes="15",
        meridiem='PM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat='',
        snooze=False,
        toggle=False,
        alarmlist_id=1
    )
    alarm3 = Alarm(
        name='Pick friend up from airport',
        hour=7,
        minutes="0",
        meridiem='AM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat='',
        snooze=False,
        toggle=False,
        alarmlist_id=1
    )
    alarm4 = Alarm(
        name='Wake up!',
        hour=7,
        minutes="0",
        meridiem='AM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat="1,2,3,4,5",
        snooze=False,
        toggle=False,
        alarmlist_id=2
    )
    alarm5 = Alarm(
        name='Clock in',
        hour=8,
        minutes="30",
        meridiem='AM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat="1,2,3,4,5",
        snooze=False,
        toggle=False,
        alarmlist_id=2
    )
    alarm6 = Alarm(
        name='Break',
        hour=12,
        minutes="30",
        meridiem='PM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat="1,2,3,4,5",
        snooze=False,
        toggle=False,
        alarmlist_id=2
    )
    alarm7 = Alarm(
        name='Break over',
        hour=1,
        minutes="30",
        meridiem='PM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat="1,2,3,4,5",
        snooze=False,
        toggle=False,
        alarmlist_id=2
    )
    alarm8 = Alarm(
        name='Clock out',
        hour=5,
        minutes="30",
        meridiem='PM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat="1,2,3,4,5",
        snooze=False,
        toggle=False,
        alarmlist_id=2
    )
    alarm9 = Alarm(
        name='Check in',
        hour=11,
        minutes="0",
        meridiem='AM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat="1,2,3,4,5",
        snooze=False,
        toggle=False,
        alarmlist_id=3
    )
    alarm10 = Alarm(
        name='Break',
        hour=2,
        minutes="15",
        meridiem='PM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat="1,2,3,4,5",
        snooze=False,
        toggle=False,
        alarmlist_id=3
    )
    alarm11 = Alarm(
        name='Check in',
        hour=3,
        minutes="30",
        meridiem='PM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat="1,2,3,4,5",
        snooze=False,
        toggle=False,
        alarmlist_id=3
    )
    alarm12 = Alarm(
        name='Break',
        hour=5,
        minutes="45",
        meridiem='PM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat="1,2,3,4,5",
        snooze=False,
        toggle=False,
        alarmlist_id=3
    )
    alarm13 = Alarm(
        name='Check in',
        hour=6,
        minutes="0",
        meridiem='PM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat="1,2,3,4,5",
        snooze=False,
        toggle=False,
        alarmlist_id=3
    )
    alarm14 = Alarm(
        name='Evening report',
        hour=8,
        minutes="0",
        meridiem='PM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat="1,2,3,4,5",
        snooze=False,
        toggle=False,
        alarmlist_id=3
    )
    alarm15 = Alarm(
        name='First wake up',
        hour=6,
        minutes="0",
        meridiem='AM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat="1,2,3,4,5",
        snooze=False,
        toggle=False,
        alarmlist_id=4
    )
    alarm16 = Alarm(
        name="Second call!",
        hour=6,
        minutes="5",
        meridiem='AM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat="1,2,3,4,5",
        snooze=False,
        toggle=False,
        alarmlist_id=4
    )
    alarm17 = Alarm(
        name="3rd time's the charm",
        hour=6,
        minutes="10",
        meridiem='AM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat="1,2,3,4,5",
        snooze=False,
        toggle=False,
        alarmlist_id=4
    )
    alarm18 = Alarm(
        name="YOURE KIDDING",
        hour=6,
        minutes="15",
        meridiem='AM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat="1,2,3,4,5",
        snooze=False,
        toggle=False,
        alarmlist_id=4
    )
    alarm19 = Alarm(
        name="I can't help you at this point",
        hour=6,
        minutes="20",
        meridiem='AM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat="1,2,3,4,5",
        snooze=False,
        toggle=False,
        alarmlist_id=4
    )
    alarm20 = Alarm(
        name="You're definitely going to be late",
        hour=6,
        minutes="25",
        meridiem='AM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat="1,2,3,4,5",
        snooze=False,
        toggle=False,
        alarmlist_id=4
    )
    alarm21 = Alarm(
        name="Last chance",
        hour=6,
        minutes="30",
        meridiem='AM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat="1,2,3,4,5",
        snooze=False,
        toggle=False,
        alarmlist_id=4
    )
    alarm22 = Alarm(
        name="Basketball",
        hour=9,
        minutes="0",
        meridiem='AM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat="0",
        snooze=False,
        toggle=False,
        alarmlist_id=1
    )
    alarm23 = Alarm(
        name="Stretch break",
        hour=3,
        minutes="30",
        meridiem='PM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat='',
        snooze=False,
        toggle=False,
        alarmlist_id=1
    )
    alarm24 = Alarm(
        name="Nap time!",
        hour=1,
        minutes="0",
        meridiem='PM',
        sound='https://timeout-jingles.s3.amazonaws.com/Daybreak.mp3',
        repeat='',
        snooze=False,
        toggle=False,
        alarmlist_id=1
    )

    db.session.add(alarm1)
    db.session.add(alarm2)
    db.session.add(alarm3)
    db.session.add(alarm4)
    db.session.add(alarm5)
    db.session.add(alarm6)
    db.session.add(alarm7)
    db.session.add(alarm8)
    db.session.add(alarm9)
    db.session.add(alarm10)
    db.session.add(alarm11)
    db.session.add(alarm12)
    db.session.add(alarm13)
    db.session.add(alarm14)
    db.session.add(alarm15)
    db.session.add(alarm16)
    db.session.add(alarm17)
    db.session.add(alarm18)
    db.session.add(alarm19)
    db.session.add(alarm20)
    db.session.add(alarm21)
    db.session.add(alarm22)
    db.session.add(alarm23)
    db.session.add(alarm24)
    db.session.commit()

def undo_alarms():
    db.session.execute('TRUNCATE alarms RESTART IDENTITY CASCADE')
    db.session.commit()
