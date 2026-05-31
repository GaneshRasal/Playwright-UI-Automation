@radio-checkbox @ui
Feature: Radio Button and Checkbox Interactions
  As a QA Engineer
  I want to interact with various radio buttons and checkboxes
  So that I can validate selection, toggling, and state transition behaviors

  Background:
    Given I open the browser and go to 'https://rahulshettyacademy.com/AutomationPractice/'
@test1
  Scenario: Select a single radio button
    When I select the "radio1" radio button
    Then the "radio1" radio button should be checked
    And the "radio2" radio button should not be checked

  Scenario: Change radio button selection (State Override)
    When I select the "radio1" radio button
    And I select the "radio2" radio button
    Then the "radio2" radio button should be checked
    And the "radio1" radio button should not be checked

  Scenario: Select a single checkbox
    When I check the "option1" checkbox
    Then the "option1" checkbox should be checked

  Scenario: Select multiple checkboxes together
    When I check the "option1" checkbox
    And I check the "option2" checkbox
    And I check the "option3" checkbox
    Then the "option1" checkbox should be checked
    And the "option2" checkbox should be checked
    And the "option3" checkbox should be checked

  Scenario: Toggle a checkbox state manually (Check and Uncheck)
    When I check the "option1" checkbox
    Then the "option1" checkbox should be checked
    When I uncheck the "option1" checkbox
    Then the "option1" checkbox should be unchecked

  Scenario: Check all available checkboxes dynamically (Bulk Action)
    When I check all the checkboxes on the page
    Then all checkboxes should be in a checked state