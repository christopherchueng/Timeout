from flask import Blueprint, jsonify, request
from app.models import db, Alarmlist, Alarm
from flask_login import login_required, current_user
from app.forms import AlarmForm

alarm_routes = Blueprint('alarms', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@alarm_routes.route('/<int:alarmlist_id>/alarms')
@login_required
def get_alarmlist_alarms(alarmlist_id):
    if alarmlist_id == 1:
        independent_alarms = Alarm.query.filter(Alarm.alarmlist_id == alarmlist_id).all()
        return jsonify([alarm.to_dict() for alarm in independent_alarms])
    else:
        alarms = Alarm.query.filter(Alarm.alarmlist_id == alarmlist_id, Alarm.alarmlist_id != 1).all()
        return jsonify([alarm.to_dict() for alarm in alarms])

@alarm_routes.route('/create', methods=['POST'])
@login_required
def add_alarm():
    form = AlarmForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_alarm = Alarm(
            name=form.data['name'],
            hour=form.data['hour'],
            minutes=form.data['minutes'],
            meridiem=form.data['meridiem'],
            repeat=form.data['repeat'],
            snooze=form.data['snooze'],
            alarmlist_id=form.data['alarmlist_id']
        )

        db.session.add(new_alarm)
        db.session.commit()
        return new_alarm.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
