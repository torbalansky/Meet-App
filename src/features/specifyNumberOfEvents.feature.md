Feature: Specify Number of Events

    Scenario: When user hasn't specified a number, 32 is the default number
        Given the user has not specified the number of events they want to see
        When the user opens the app
        Then the app should display a list of 32 upcoming events by default

    Scenario: User can change the number of events they want to see
        Given the user is viewing a list of events
        When the user specifies the number of events they want to see
        Then the app should display that number of upcoming events