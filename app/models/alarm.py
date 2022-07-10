from .db import db


class Alarm(db.Model):
    __tablename__ = 'alarms'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    hour = db.Column(db.Integer, nullable=False)
    minutes = db.Column(db.Integer, nullable=False)
    meridiem = db.Column(db.String(10), nullable=False)
    sound = db.Column(db.String(255))
    repeat = db.Column(db.String(255))
    snooze = db.Column(db.Boolean)
    alarmlist_id = db.Column(db.Integer, db.ForeignKey('alarmlists.id'), nullable=False)


    # Many-to-One relationship with Alarmlists
    alarmlists = db.relationship('Alarmlist', back_populates='alarms', cascade="all, delete")

    def convert_repeat(self):
        repeat_list = dict(self.repeat)


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
