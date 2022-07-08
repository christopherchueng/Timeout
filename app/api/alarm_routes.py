from flask import Blueprint, jsonify, request
from app.models import db, Alarmlist, Alarm
from flask_login import login_required, current_user

alarm_routes = Blueprint('alarms', __name__)

@alarm_routes.route('/<int:alarmlist_id>/alarms')
@login_required
def get_alarmlist_alarms(alarmlist_id):
    if alarmlist_id == 1:
        independent_alarms = Alarm.query.filter(Alarm.alarmlist_id == alarmlist_id).all()
        return jsonify([alarm.to_dict() for alarm in independent_alarms])
    else:
        alarms = Alarm.query.filter(Alarm.alarmlist_id == alarmlist_id, Alarm.alarmlist_id != 1).all()
        return jsonify([alarm.to_dict() for alarm in alarms])
