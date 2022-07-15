from .db import db

class Alarmlist(db.Model):
    __tablename__ = 'alarmlists'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(100), nullable=False, unique=True)
    toggle = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


    # Many-to-One relationship with User
    users = db.relationship('User', back_populates='alarmlists')

    # One-to-Many relationship with Alarms
    alarms = db.relationship('Alarm', back_populates='alarmlists', cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'toggle': self.toggle,
            'userId': self.user_id,
        }
