from app.models import db, Alarmlist

def seed_alarmlists():
    independent_alarms = Alarmlist(
        name='Default',
        user_id=1
    )
    work_alarmlist = Alarmlist(
        name='Work',
        user_id=1
    )
    school_alarmlist = Alarmlist(
        name='School',
        user_id=1
    )
    sleep_alarmlist = Alarmlist(
        name='Sleep',
        user_id=1
    )

    db.session.add(independent_alarms)
    db.session.add(work_alarmlist)
    db.session.add(school_alarmlist)
    db.session.add(sleep_alarmlist)

    db.session.commit()

def undo_alarmlists():
    db.session.execute('TRUNCATE alarmlists RESTART IDENTITY CASCADE')
    db.session.commit()
