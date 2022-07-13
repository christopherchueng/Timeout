flask db migrate
flask db upgrade
flask seed all
flask seed undo

flask db downgrade

heroku run -a app-timeout flask seed undo
heroku run -a app-timeout flask seed all

Branch:

What are you working on? (give us some context)


Describe the problem (what are you trying to do? what is it currently doing?)


What error messages do you have?


What have you done to debug? What have you searched/tried?


Relevant code snippets/screenshots (crop, mark-up, or explain them)


Alarmlist logic
<!-- ALARMLIST SHOULD ONLY BE ON IF ALLLLL ALARMS ARE ON
ALARMLIST OFF SHOULD HAVE 2 OPERATIONS:
TURN OFF ALL ALARMS IF ALL ALARMS WERE ON TO BEGIN WITH
ALARMLIST TOGGLE SHOULD REMAIN OFF UNLESS ALL ALARMS UNDER ALARMLIST ARE ON.  -->

Alarm logic
<!-- ALARM CAN BE ON OR OFF AND SHOULD NOT AFFECT THE ALARMLIST TOGGLE NOR OTHER ALARMS.
UNLESS YOU ARE TURNING ON THE LAST ALARM IN THE ALARMLIST.
EX: 9/10 OF THE ALARMS IN THE ALARMLIST ARE ON. IF I TURN ON THE 10TH ALARM,
THE ALARMLIST TOGGLE SHOULD BE ON BECAUSE NOW ALL ALARMS ARE ON. -->


     Dashboard
        /
       /
 Alarmlist
     /
    /
Alarm
