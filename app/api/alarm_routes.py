from flask import Blueprint, jsonify, request
from app.models import db, Alarmlist, Alarm
from flask_login import login_required, current_user

alarm_routes = Blueprint('alarms', __name__)

@alarm_routes.route('/<int:id>/alarms')
@login_required
def get_alarmlist_alarms(id):
    alarms = Alarm.query.filter(Alarm.alarmlist_id == id).all()
    return jsonify([alarm.to_dict() for alarm in alarms])
