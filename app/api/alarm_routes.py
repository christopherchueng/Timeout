from flask import Blueprint, jsonify, request
from app.models import db, Alarmlist, Alarm
from flask_login import login_required, current_user
from app.forms import AlarmForm

alarm_routes = Blueprint('alarms', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages

@alarm_routes.route('/<int:alarm_id>')
@login_required
def get_one_alarm(alarm_id):
    alarm = Alarm.query.get(alarm_id)
    return alarm.to_dict()

@alarm_routes.route('/<int:alarmlist_id>/alarms')
@login_required
def get_alarmlist_alarms(alarmlist_id):
    # if alarmlist_id == 1:
    #     independent_alarms = Alarm.query.filter(Alarm.alarmlist_id == int(alarmlist_id)).all()
    #     return jsonify([alarm.to_dict() for alarm in independent_alarms])
    # else:
    alarms = Alarm.query.filter(Alarm.alarmlist_id == int(alarmlist_id)).all()
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
            toggle=True,
            alarmlist_id=form.data['alarmlist_id']
        )

        db.session.add(new_alarm)
        db.session.commit()
        return new_alarm.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@alarm_routes.route('/<int:alarm_id>/edit', methods=['PUT'])
@login_required
def update_alarm(alarm_id):
    form = AlarmForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    alarm = Alarm.query.get(alarm_id)
    print('-'*50, 'NAME', form.data['name'])
    print('-'*50, 'HOUR', form.data['hour'])
    print('-'*50, 'MINUTES', form.data['minutes'])
    print('-'*50, 'MERIDIEM', form.data['meridiem'])
    print('-'*50, 'REPEAT', form.data['repeat'])
    print('-'*50, 'SNOOZE', form.data['snooze'])
    print('-'*50, 'TOGGLE', form.data['toggle'])
    print('-'*50, 'ALARMLISTID', type(form.data['alarmlist_id']))

    if form.validate_on_submit():
        print('HI THIS IS ME IN VALIDATE FORM CONIDITONAL WHY YOU NO WORK.')
        alarm.name=form.data['name']
        alarm.hour=form.data['hour']
        alarm.minutes=form.data['minutes']
        alarm.meridiem=form.data['meridiem']
        alarm.repeat=form.data['repeat']
        alarm.snooze=form.data['snooze']
        # alarm.sound=form.data['sound']
        alarm.toggle=form.data['toggle']
        alarm.alarmlist_id=form.data['alarmlist_id']

        db.session.commit()
        return alarm.to_dict()
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@alarm_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_alarm(id):
    alarm = Alarm.query.get(id)

    db.session.delete(alarm)
    db.session.commit()

    return alarm.to_dict()
