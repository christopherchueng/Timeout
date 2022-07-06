flask db downgrade
flask db upgrade

flask seed undo
flask seed all

heroku run -a app-timeout flask seed undo
heroku run -a app-timeout flask seed all
