from flask import Blueprint, jsonify, request
from app.models import db, Alarmlist
from flask_login import login_required, current_user
from app.forms import AlarmlistForm

alarmlist_routes = Blueprint('alarmlists', __name__)


@alarmlist_routes.route('/')
@login_required
def get_alarmlists():
    # Get all of the current user's alarmlists
    alarmlists = Alarmlist.query.filter(Alarmlist.user_id == current_user.get_id()).all()
    return jsonify([alarmlist.to_dict() for alarmlist in alarmlists])

@alarmlist_routes.route('/', methods=['POST'])
@login_required
def post_alarmlist():
    form = AlarmlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if (form.validate_on_submit()):
        new_alarmlist = Alarmlist(
            name=form.data['name'],
            user_id=form.data['user_id']
        )

        db.session.add(new_alarmlist)
        db.session.commit()
        return new_alarmlist.to_dict()
