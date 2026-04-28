@input
Feature: Input Field Interactions
  As a QA Engineer
  I want to interact with various input fields
  So that I can validate text input behaviour

 Background: 
 Given I open the browser and go to 'https://practice.expandtesting.com/inputs'

 Scenario: Type text into a simple input field
    When I fill the number input with "42"
    And I click the "Display Inputs" button
    Then the number output should have value "42"

  Scenario: Type text into the Text input
    When I fill the text input with "Test Data"
    And I click the "Display Inputs" button
    Then the text output should have value "Test Data"

  Scenario: Select a date in the Date input
    When I fill the date input with "2025-06-15"
    And I click the "Display Inputs" button
    Then the date output should have value "2025-06-15"  

  Scenario: Fill all inputs and display them together
    When I fill the number input with "10"
    And I fill the text input with "Playwright"
    And I fill the date input with "2025-01-01"
    And I click the "Display Inputs" button
    Then the number output should have value "10"
    Then the text output should have value "Playwright"
    Then the date output should have value "2025-01-01"

  Scenario: Clear all inputs using the Clear button
    When I fill the text input with "ToBeCleared"
    And I fill the number input with "999"
    And I click the "Clear Inputs" button
    Then the text output should not be visible
    And the number output should not be visible

  Scenario: Manually clear a single input and retype
    When I fill the text input with "OldText"
    And I fill the text input with "NewText"
    When I clear the text input manually
    Then the text output should not be visible
    And the number output should not be visible 