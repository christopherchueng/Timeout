flask db migrate
flask db upgrade
flask seed all
flask seed undo

flask db downgrade

heroku run -a app-timeout flask seed undo
heroku run -a app-timeout flask seed all
