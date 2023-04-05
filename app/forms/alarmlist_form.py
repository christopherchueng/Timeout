from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Alarmlist

def alarmlist_name_validators(form, field):
    # Checking if alarmlist name exists
    name = field.data
    alarmlist = Alarmlist.query.filter(Alarmlist.name == name).first()
    if len(name) > 100:
        raise ValidationError('Please select a name up to 100 characters long.')


class AlarmlistForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), alarmlist_name_validators])
    toggle = BooleanField('toggle')
    user_id = IntegerField('user_id')
