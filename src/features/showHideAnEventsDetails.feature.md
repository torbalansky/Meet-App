Feature: Show/Hide an Event's Details

    Scenario: An event element is collapsed by default
        Given the user is viewing a list of events
        When the user sees an event element
        Then the event element should be collapsed by default

    Scenario: User can expand an event to see its details
        Given the user is viewing a collapsed event element
        When the user clicks on the “Show details” button
        Then the event element should expand, displaying the event details

    Scenario: User can collapse an event to hide its details
        Given the user is viewing an expanded event element
        When the user clicks on the “Hide details” button
        Then the event element should collapse, hiding the event details