# Timeout
It's a Friday, and you have a three day weekend (Monday is a holiday). However, you have all of these alarms set for the weekday to wake yourself help. Because school/work has been stressing you out, you decide you would like to sleep in on Monday, which means you'll need to go through the excruciating pain of having to manually turn off all your alarms one by one... Based on this true story, [Timeout](https://app-timeout.herokuapp.com/) was created.

Inspired and frustrated by Apple's Clock mobile app, Timeout allows you to create, read, update, and delete your own custom alarm, just like Apple's Clock app. However, Timeout provides an additional feature, `Alarmlists`, that allow users to compartmentalize alarms so that they can toggle all alarms under that specific alarmlist on or off with the touch of a button. No more manual labor!

![Screen Shot 2022-07-18 at 1 07 14 AM](https://user-images.githubusercontent.com/78316838/179451463-9d4e5fba-3d79-4934-b9f3-be663bec8d9b.png)

# Technologies Used:
* Flask
* React/Redux
* SQLAlchemy
* PostgreSQL
* Docker
* AWS

![Screen Shot 2022-07-18 at 1 07 48 AM](https://user-images.githubusercontent.com/78316838/179451478-f14c4279-8155-4b44-8ccd-5c28fb10aa13.png)

# Features
## Alarms
As a signed in user, you will be able to create, read, update, and delete your own personalized alarm that will help you manage your time. Alarms can be created by clicking the 'plus' button in the navigation bar. You may select an hour, minute, meridiem, name, an alarmlist to add to, days to repeat, and a snooze option. If any mistakes were made, you may navigate to the specific alarmlist page, find the alarm you would like to edit, and click the edit button.

![Screen Shot 2022-07-18 at 1 10 41 AM](https://user-images.githubusercontent.com/78316838/179451500-302568d1-d16a-48e5-a7a6-6d5096e0d8cd.png)

## Alarmlists
As a signed in user, you will be able to create, read, update, and delete their own alarmlists. Simply enter a unique name for your alarmlist and begin creating alarms to add/remove to/from that alarmlist. Once you have successfully added several alarms to that alarmlist, use the toggle button of the alarmlist to turn on/off your alarms in one click! Please note that the `Default` alarmlist may not be edited or deleted. Nevertheless, you will still be able to add, update, or delete alarms under the `Default` alarmlist.

![Screen Shot 2022-07-18 at 1 08 24 AM](https://user-images.githubusercontent.com/78316838/179451512-07ef73da-b4b2-4112-87e5-01b13e7d5c08.png)
![Screen Shot 2022-07-18 at 1 09 03 AM](https://user-images.githubusercontent.com/78316838/179451527-dc60ca48-e5ba-4c2f-a15d-49fcf3b709bd.png)
![Screen Shot 2022-07-18 at 1 09 39 AM](https://user-images.githubusercontent.com/78316838/179451530-0679352b-8362-48ce-88d7-6cf288f926b5.png)

## Snooze
Once an alarm has been set, wait and see what happens (this should be no surprise)! This was probably one of the trickiest parts of the projects due to the many cases I had to consider. However, with the help of local storage and context, I was able to implement a timer and have the alarm go off at the right day and time. The below code exhibits an extensive snooze boolean condition: when the snooze checkbox is on, then display the snooze modal. Otherwise, have the alarm go off and turn off the alarm toggle. The worst part about this feature was having to wait for the currentTime to match the alarm set. If only there was a way to fast forward time!

## AWS
Personalize the way your alarms sound by uploading your own jingles/sounds/songs to an alarm!

## Honorable Mentions
## Days of the Week
When a user selects specific repeated days, pay attention to the days displayed on the dashboard that was implemented by the code below!

## Minutes as a String?!
When creating/editing an alarm and trying to enter the integer 0 as a value under the minutes column, I kept receiving an invalid input because the DataRequired validator in wtforms considers 0 as an erroneous/falsey input. To accommodate for this, I had to change the minutes field into a StringField and use the InputRequired validator.

## Converting Repeated Days
Since the repeated days field can take in a collection of data, I had to find a way that would allow the frontend and backend to communicate and deliver information to each other. When a user submits a form with repeated days selected, this will send over a string of number(s) to the backend. When the payload gets to the backend, I created a function that extracts the data, converts the numbers into a dictionary that includes the name, id, and shortened name, and then deliver the conversion to the frontend.

# Run App Locally

1. Clone the repository

```
git clone git@https://github.com/christopherchueng/Timeout.git
```

2. Install dependencies

- In root folder, install Python server.

```
pipenv install
```

- Navigate to react-app folder, run npm install

```
cd react-app
npm install
```

3. Setup your PostgreSQL user, password and database

```
CREATE USER timeout_user WITH PASSWORD 'password';
CREATE DATABASE timeout_dev WITH OWNER timeout_user;
```

4. create a .env file in root folder, based on the .env.example with proper settings for your development environment

5. Migrate and seed your database in root folder

```
pipenv run flask db upgrade
pipenv run flask seed all
```

6. Start the server

- In root folder

```
pipenv shell
flask run
```

- Navigate to react-app folder

```
npm start
```

# Upcoming features
* Stopwatch
* Timer
* International times
