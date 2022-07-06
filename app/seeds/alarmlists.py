from app.models import db, Alarmlist

def seed_alarmlists();
    independent_alarms = Watchlist(
        name='Alarms',
        user_id=1
    )
    work_alarmlist = Watchlist(
        name='Work',
        user_id=1
    )
    school_alarmlist = Watchlist(
        name='School',
        user_id=1
    )
    sleep_alarmlist = Watchlist(
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
