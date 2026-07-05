@iframe
Feature: Iframe Handling
Background:
    Given I open the browser and go to 'https://rahulshettyacademy.com/AutomationPractice/'

  Scenario: User navigates inside the iframe
    When I switch to the Courses iframe
    Then I should see the "All Access plan" link