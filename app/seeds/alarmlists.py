from app.models import db, Alarmlist

def seed_alarmlists():
    independent_alarms = Alarmlist(
        name='Other',
        toggle=False,
        user_id=1
    )
    work_alarmlist = Alarmlist(
        name='Work',
        toggle=False,
        user_id=1
    )
    school_alarmlist = Alarmlist(
        name='School',
        toggle=False,
        user_id=1
    )
    sleep_alarmlist = Alarmlist(
        name='Sleep',
        toggle=False,
        user_id=1
    )

    db.session.add(independent_alarms)
    db.session.add(work_alarmlist)
    db.session.add(school_alarmlist)
    db.session.add(sleep_alarmlist)

    db.session.commit()

def undo_alarmlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.alarmlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM alarmlists")
    db.session.commit()
