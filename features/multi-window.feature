@multiwindow @ui
Feature: Multi Window Handling
   
  Scenario: User opens a new window and verifies its content
   Given I open the browser and go to 'https://rahulshettyacademy.com/AutomationPractice/'
    When I open the "Open Window" page
    Then  the newly opened page URL should contain

  Scenario: Open a new browser tab and verify its content
    Given I navigate to "https://the-internet.herokuapp.com/windows"
    When I open a new browser tab
    Then the newly opened page should display the heading "New Window"  

    Scenario: Return to the parent page after closing the new tab
    Given I navigate to "https://the-internet.herokuapp.com/windows"
    When I open a new browser tab
    And I close the newly opened page
    Then I should be back on the parent page  