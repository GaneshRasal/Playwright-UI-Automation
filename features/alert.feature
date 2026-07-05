@alert @ui
Feature: Working with browser dialogs

    Background:
        Given I navigate to "https://the-internet.herokuapp.com/javascript_alerts"

    Scenario: Accept a JavaScript alert
        When I accept the JavaScript alert
        Then I should see the result message "You successfully clicked an alert"

    Scenario: Accept a confirmation dialog
        When I accept the confirmation dialog
        Then I should see the result message "You clicked: Ok"

    Scenario: Dismiss a confirmation dialog
        When I dismiss the confirmation dialog
        Then I should see the result message "You clicked: Cancel"

    Scenario: Enter text in a prompt dialog
        When I enter "Ganesh" in the prompt dialog
        Then I should see the result message "You entered: Ganesh"