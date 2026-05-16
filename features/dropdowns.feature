@dropdowns @ui
Feature: Dropdown Interactions
  As a QA Engineer
  I want to interact with static and dynamic dropdowns
  So that I can validate value selection, label selection, and auto-suggest behaviors

  Background:
    Given I open the browser and go to 'https://rahulshettyacademy.com/AutomationPractice/'

  # --- STATIC DROPDOWN COMBINATIONS ---

  Scenario: Select an option from a static dropdown by Value
    When I select the option with value "option1" from the static dropdown
    Then the static dropdown should display the text "Option1"

  Scenario: Select an option from a static dropdown by visible Label
    When I select the option with label "Option2" from the static dropdown
    Then the static dropdown should display the text "Option2"

  Scenario: Change selection in a static dropdown (Override)
    When I select the option with label "Option1" from the static dropdown
    And I select the option with label "Option3" from the static dropdown
    Then the static dropdown should display the text "Option3"

   # --- DYNAMIC / AUTO-SUGGEST COMBINATIONS ---

  Scenario: Type and select exact match in dynamic auto-suggest dropdown
    When I type "India" into the dynamic country dropdown
    And I wait for the auto-suggest list to populate
    And I select "India" from the dynamic suggestion list
    Then the dynamic dropdown input should contain the value "India"

  Scenario: Type partial match and select from dynamic auto-suggest list
    When I type "ind" into the dynamic country dropdown
    And I wait for the auto-suggest list to populate
    And I select "Indonesia" from the dynamic suggestion list
    Then the dynamic dropdown input should contain the value "Indonesia"

  Scenario: Clear dynamic dropdown and search again
    When I type "USA" into the dynamic country dropdown
    And I clear the dynamic country dropdown manually
    And I type "India" into the dynamic country dropdown
    And I wait for the auto-suggest list to populate
    And I select "India" from the dynamic suggestion list
    Then the dynamic dropdown input should contain the value "India"

  Scenario: Navigate dynamic dropdown using keyboard controls
    When I type "uni" into the dynamic country dropdown
    And I wait for the auto-suggest list to populate
    And I press the "ArrowDown" key 2 times
    And I press the "Enter" key
    Then the dynamic dropdown input should not be empty