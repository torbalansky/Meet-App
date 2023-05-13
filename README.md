# Meet-App

![](https://github.com/torbalansky/meet/blob/main/MeetApp.png?raw=true)

### Overview:

MeetApp is an application designed to assist users with researching, scheduling, and attending events in their respective cities. The app was developed using the test-driven development technique (TDD) and has been designed as a serverless, progressive web app (PWA). It utilizes the Google Calendar API to retrieve upcoming events, and access authorization is facilitated by the serverless backend, which is powered by AWS Lambda. This backend performs key verification and generates a token that grants users access to the API. It is important to note that the application is currently in the development stage and may be subject to changes and updates in the near future.

### Used technologies
- React
- JavaScript
- HTML
- CSS
<br>
The app is hosted on GitHub Pages and can be found https://torbalansky.github.io/meet/

### Feature 1: Filter events by city
User story: As a user, I want to filter events by city so that I can easily see the events taking place in a specific city.
*Scenario 1:* Show upcoming events from all cities when the user hasn't searched for a specific city.
Given the app is loaded. When the user hasn't searched for any city. Then the user should see a list of all upcoming events.
*Scenario 2:* Show a list of suggestions when the user starts typing the name of a city.
Given the main page is open with the list of events in all cities. When the user starts typing the name of a city in the text box. Then the user should see a list of cities (suggestions) that match what they have typed.
*Scenario 3:* Show a list of upcoming events in the specified city when the user searches for a city.
Given the user has typed "Sofia" in the city textbox, and the list of suggested cities is showing. When the user selects a city (e.g., "Sofia, Bulgaria") from the list of suggested cities. Then the user's city should be changed to the selected city (i.e., "Sofia, Bulgaria") and the user should receive a list of upcoming events in the specified city.
### Feature 2: Show/Hide an event's details
User story: As a user, I want to be able to show or hide an event's details so that I can see more or less information about an event.
*Scenario 1:* Collapse event details by default.
Given the app is loaded and the user has received a list of upcoming events in the specified city (all cities). When the user views the list of events. Then the event details should not be visible for the user.
*Scenario 2:* Expand an event to see its details.
Given the user has received general information about upcoming events. When the user clicks the "Details" button for a specific event. Then the specific event should be expanded with its details.
*Scenario 3:* Collapse an event to hide its details.
Given a specific event is expanded with its details. When the user clicks the "Back" button for that specific event. Then the specific event should be collapsed, its details should be hidden, and the user should receive the full list of upcoming events with general information only.
### Feature 3: Sprecify number of events
User story: As a user, I want to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.
*Scenario 1:* Use 32 as the default number of events when the user hasn't specified a number.
Given the app is loaded and the user has received a list of upcoming events in the specified city (all cities). When the user hasn't specified a number of events to be shown. Then the user should receive the first 32 upcoming events on the screen.
*Scenario 2:* Change the number of events the user wants to see.
Given the app is loaded and the user has received a list of upcoming events in the specified city (all cities). When the user chooses a number of events to be shown by selecting it in the input (32, 64, or 96). Then the user should receive the first 32, 64, or 96 upcoming events on the screen, depending on the chosen number.
### Feature 4: Use the app when offline
User story: As a user, I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online.
*Scenario 1:* Show cached data when there's no internet connection
Given the user has previously opened the app with an available internet connection. When the user opens the app without an internet connection. Then the user receives cached data from their last session (the last data the user had seen with an active internet connection).
*Scenario 2:* Show error when user changes the settings (city, time range)
Given the user has opened the app without an internet connection and received cached data from their last session. When the user changes the settings (city, time range). Then the user receives an error message indicating that data is not available without an internet connection.
### Feature 5: Data visualization
User story: As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city.
*Scenario 1:* Show a chart with the number of upcoming events in each city
Given the app is loaded, the user has received a list of upcoming events in a specified city (all cities). When the user pushes the button "Visualize." Then they will see a chart showing the number of upcoming events in that city, categorized by type.


