# Meet-App

![](https://github.com/torbalansky/meet/blob/main/MeetApp.png?raw=true)

## Overview

MeetApp is an application designed to assist users with researching, scheduling, and attending events in their respective cities. The app was developed using the test-driven development technique (TDD) and has been designed as a serverless, progressive web app (PWA). It utilizes the Google Calendar API to retrieve upcoming events, and access authorization is facilitated by the serverless backend, which is powered by AWS Lambda. This backend performs key verification and generates a token that grants users access to the API. It is important to note that the application is currently in the development stage and may be subject to changes and updates in the near future.

## Used Technologies

- React
- JavaScript
- HTML
- CSS

The app is hosted on GitHub Pages and can be found [here]

---

## Features & Scenarios

### 1. **Filter Events By City**

#### **Scenarios:**

- **Scenario 1**: **When user hasn’t searched for a city, show upcoming events from all cities**
    ```gherkin
    Given user hasn't searched for a city
    When user opens the app
    Then the user should see the list of all upcoming events
    ```

- **Scenario 2**: **User should see a list of suggestions when they search for a city**
    ```gherkin
    Given the user opens the app
    When the user starts typing a city name in the textbox
    Then the user should see a list of suggestions of cities from the dropdown
    ```

- **Scenario 3**: **User can select a city from the suggested list**
    ```gherkin
    Given the event list is displayed
    And the list of suggested cities is showing
    When the user selects a city (e.g., "Berlin, Germany") from the list
    Then their city should be changed to that city (i.e., "Berlin, Germany")
    And the user should receive a list of upcoming events in that city
    ```

---

### 2. **Show/Hide Event Details**

#### **Scenarios:**

- **Scenario 1**: **An event element is collapsed by default**
    ```gherkin
    Given the user is on the app
    When the app displays the list of events
    Then the user should see the event element collapsed by default
    ```

- **Scenario 2**: **User can expand an event to see details**
    ```gherkin
    Given the app displays events and event details are hidden
    When the user clicks the "show event" button
    Then the user should see the hidden event expand to view
    ```

- **Scenario 3**: **User can collapse an event to hide details**
    ```gherkin
    Given the event is expanded and visible
    When the user clicks the "hide event" button
    Then the user should see the event collapse and hide
    ```

---

### 3. **Specify Number of Events**

#### **Scenarios:**

- **Scenario 1**: **Show default number of events when user hasn’t specified a number**
    ```gherkin
    Given the event app is displayed
    And the user has not specified the number of events to display
    When the user views the events section
    Then 32 events should be displayed by default
    ```

- **Scenario 2**: **User can change the number of events displayed**
    ```gherkin
    Given the event app is displayed
    And the user has specified the number of events to display as "10"
    When the user changes the number of events to display to "10"
    Then the event list should display "10" events
    ```

---

### 4. **Use the App When Offline**

#### **Scenarios:**

- **Scenario 1**: **Show cached data when there’s no internet connection**
    ```gherkin
    Given the event app is installed as a PWA
    And the app is currently offline
    And there is cached event data available
    When the user opens the app
    Then the app should display the cached event data
    ```

- **Scenario 2**: **Show error when user changes search settings (city, number of events)**
    ```gherkin
    Given the event app is installed as a PWA
    And the app is currently offline
    When the user attempts to change the search settings to a different city "New York"
    Then an error message "Cannot change settings while offline" should be displayed

    Given the event app is installed as a PWA
    And the app is currently offline
    When the user attempts to change the number of events to display to "10"
    Then an error message "Cannot change settings while offline" should be displayed
    ```

---

### 5. **Add an App Shortcut to the Home Screen**

#### **Scenario:**

- **Scenario 1**: **User can install the meet app as a shortcut on their device home screen**
    ```gherkin
    Given the user has the event management app installed
    When the user adds a shortcut to the home screen
    Then the user should be able to access the app quickly from the home screen
    ```

---

### 6. **Display Charts Visualizing Event Details**

#### **Scenario:**

- **Scenario 1**: **Show a chart with the number of upcoming events in each city**
    ```gherkin
    Given the user is on the event management app
    When the user views event details
    Then the user should see a chart visualizing the number of upcoming events in each city
    ```

---

## Installation & Setup

To get the MeetApp running locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/torbalansky/meet.git
    ```

2. Navigate to the project folder:
    ```bash
    cd meet
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Run the app:
    ```bash
    npm start
    ```

5. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

---