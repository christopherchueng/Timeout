from flask import Blueprint, jsonify, request
from app.models import db, Alarmlist
from flask_login import login_required, current_user
from app.forms import AlarmlistForm

alarmlist_routes = Blueprint('alarmlists', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages
    # errorMessages = []
    # for field in validation_errors:
    #     for error in validation_errors[field]:
    #         errorMessages.append(f'{field} : {error}')
    # return errorMessages


@alarmlist_routes.route('/<int:alarmlist_id>')
@login_required
def get_one_alarmlist_no_default(alarmlist_id):
    # Get all of the current user's alarmlists (no default)
    alarmlist = Alarmlist.query.get(alarmlist_id)
    return alarmlist.to_dict()

@alarmlist_routes.route('/')
@login_required
def get_alarmlists():
    # Get all of the current user's alarmlists (no default)
    alarmlists = Alarmlist.query.filter(Alarmlist.user_id == current_user.get_id()).all()
    return jsonify([alarmlist.to_dict() for alarmlist in alarmlists])

@alarmlist_routes.route('/default')
@login_required
def get_default_alarmlist():
    # Get default alarmlist
    default_alarmlist = Alarmlist.query.filter(Alarmlist.user_id == current_user.get_id(), Alarmlist.name == 'Default').first()
    return default_alarmlist.to_dict()

@alarmlist_routes.route('/', methods=['POST'])
@login_required
def post_alarmlist():
    form = AlarmlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_alarmlist = Alarmlist(
            name=form.data['name'],
            toggle=False,
            user_id=form.data['user_id']
        )

        db.session.add(new_alarmlist)
        db.session.commit()
        return new_alarmlist.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@alarmlist_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_alarmlist(id):
    form = AlarmlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    alarmlist = Alarmlist.query.get(id)

    if form.validate_on_submit():
        alarmlist.name = form.data['name']
        alarmlist.toggle = form.data['toggle']

        db.session.commit()
        return alarmlist.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@alarmlist_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_alarmlist(id):
    alarmlist = Alarmlist.query.get(id)

    db.session.delete(alarmlist)
    db.session.commit()

    return alarmlist.to_dict()
