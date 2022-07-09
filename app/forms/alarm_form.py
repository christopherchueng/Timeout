from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Alarmlist

# Checking if alarm name exists and if it is within the 150 character range.
def name_exists(form, field):
    name = field.data
    if len(name) > 150:
        raise ValidationError('Please provide a name that is at most 150 characters long.')

def check_hour(form, field):
    hour = field.data
    if hour > 12 or hour <= 0:
        raise ValidationError('Please provide a number between 1 and 12.')

def check_minutes(form, field):
    minutes = field.data
    if minutes > 60 or minutes < 0:
        raise ValidationError('Please provide a number between 0 and 60.')

def check_meridiem(form, field):
    meridiem = field.data
    if meridiem.upper() != 'AM' or meridiem.upper() != 'PM':
        raise ValidationError("Please select 'AM' or 'PM.'")


class AlarmForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), name_exists])
    hour = IntegerField('hour', validators=[DataRequired(), check_hour])
    minutes = IntegerField('minutes', validators=[DataRequired(), check_minutes])
    meridiem = StringField('meridiem', validators=[DataRequired()])
    sound = StringField('sound')
    repeat = StringField('repeat')
    snooze = BooleanField('snooze')
    alarmlist_id = IntegerField('alarmlist_id')
