from .db import db
from enum import Enum

class Days(Enum):
    SUNDAY = 0
    MONDAY = 1
    TUESDAY = 2
    WEDNESDAY = 3
    THURSDAY = 4
    FRIDAY = 5
    SATURDAY = 6


class Alarm(db.Model):
    __tablename__ = 'alarms'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    hour = db.Column(db.Integer, nullable=False)
    minutes = db.Column(db.Integer, nullable=False)
    meridiem = db.Column(db.String(10), nullable=False)
    sound = db.Column(db.String(255))
    repeat = db.Column(db.Enum(Days))
    snooze = db.Column(db.Boolean, nullable=False)
    alarmlist_id = db.Column(db.Integer, db.ForeignKey('alarmlists.id'), nullable=False)


    # Many-to-One relationship with Alarmlists
    alarmlists = db.relationship('Alarmlist', back_populates='alarms', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'hour': self.hour,
            'minutes': self.minutes,
            'meridiem': self.meridiem,
            'sound': self.sound,
            'repeat': self.repeat,
            'snooze': self.snooze,
            'alarmlistId': self.alarmlist_id
        }
