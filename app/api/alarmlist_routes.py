from flask import Blueprint, jsonify, request
from app.models import Alarmlist
from flask_login import login_required, current_user

alarmlist_routes = Blueprint('alarmlists', __name__)


@alarmlist_routes.route('/')
@login_required
def get_alarmlists():
    # Get all of the current user's alarmlists
    alarmlists = Alarmlist.query.filter(Alarmlist.user_id == current_user.get_id()).all()
    return jsonify([alarmlist.to_dict() for alarmlist in alarmlists])
