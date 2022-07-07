from flask import Blueprint, jsonify
from app.models import Alarmlist
from flask_login import login_required

alarmlist_routes = Blueprint('alarmlists', __name__)


@alarmlist_routes.route('/')
@login_required
def get_alarmlists():
    alarmlists = Alarmlist.query.all()
    return [alarmlist.to_dict() for alarmlist in alarmlists]
