from .db import db
from datetime import datetime


def convert_repeat(day_str):
    weekdays_mapping = ("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
    repeat_days = []
    if day_str == None or len(day_str) == 0:
        day_str = ''
    elif len(day_str) == 1:
        day_str = [day_str]
    else:
        day_str = day_str.split(',')

    for num in day_str:
        for i, day in enumerate(weekdays_mapping):
            if int(num) == i:
                repeat_days.append({'name': day, 'id': i, 'short': day[0:3]})
    return repeat_days


class Alarm(db.Model):
    __tablename__ = 'alarms'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    hour = db.Column(db.Integer, nullable=False)
    minutes = db.Column(db.String(10), nullable=False)
    meridiem = db.Column(db.String(10), nullable=False)
    sound = db.Column(db.String(255))
    repeat = db.Column(db.String(255))
    snooze = db.Column(db.Boolean)
    toggle = db.Column(db.Boolean)
    alarmlist_id = db.Column(db.Integer, db.ForeignKey('alarmlists.id'), nullable=False)


    # Many-to-One relationship with Alarmlists
    alarmlists = db.relationship('Alarmlist', back_populates='alarms')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'hour': self.hour,
            'minutes': int(self.minutes),
            'meridiem': self.meridiem,
            'sound': self.sound,
            'repeat': convert_repeat(self.repeat),
            'snooze': self.snooze,
            'toggle': self.toggle,
            'alarmlistId': self.alarmlist_id
        }

    def view_alarmlist_alarms(self):
        return {
            'id': self.id,
            'name': self.name,
            'hour': self.hour,
            'minutes': self.minutes,
            'meridiem': self.meridiem,
            'alarmlistId': self.alarmlist_id
        }
