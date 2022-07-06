from .db import db

class Alarmlist(db.Model):
    __tablename__ = 'alarmlists'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(100), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    users = db.relationship('User', back_populates='alarmlists')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'userId': self.user_id,
        }
