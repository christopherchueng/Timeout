# Timeout
It's a Friday, and you have a three day weekend (Monday is a holiday). However, you have all of these alarms set for the weekday to wake yourself help. Because school/work has been stressing you out, you decide you would like to sleep in on Monday, which means you'll need to go through the excruciating pain of having to manually turn off all your alarms one by one... Based on this true story, Timeout was created.

Inspired and frustrated by Apple's Clock mobile app, Timeout allows you to create, read, update, and delete your own custom alarm, just like Apple's Clock app. However, Timeout provides an additional feature, `Alarmlists`, that allow users to compartmentalize alarms so that they can toggle all alarms under that specific alarmlist on or off with the touch of a button. No more manual labor!

# Technologies Used:
* Flask
* React/Redux
* SQLAlchemy
* PostgreSQL
* Docker

# Features
## Alarms
As a signed in user, you will be able to create, read, update, and delete your own personalized alarm that will help you manage your time. Alarms can be created by clicking the 'plus' button in the navigation bar. You may select an hour, minute, meridiem, name, an alarmlist to add to, days to repeat, and a snooze option. If any mistakes were made, you may navigate to the specific alarmlist page, find the alarm you would like to edit, and click the edit button.

## Alarmlists
As a signed in user, you will be able to create, read, update, and delete their own alarmlists. Simply enter a unique name for your alarmlist and begin creating alarms to add/remove to/from that alarmlist. Once you have successfully added several alarms to that alarmlist, use the toggle button of the alarmlist to turn on/off your alarms in one click! Please note that the `Default` alarmlist may not be edited or deleted. Nevertheless, you will still be able to add, update, or delete alarms under the `Default` alarmlist.

# Upcoming features
* AWS alarm jingle uploads
* Stopwatch
* Timer
* International times
