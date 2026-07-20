Feature: End-to-End AI Test

  @run-ai
  Scenario: AI performs actions using natural language

    Given I navigate to the practice site
    When I ask AI to "type 99 into the Number input"
    And I ask AI to "click the Clear Inputs button"
    And I ask AI to "the number output should have value 42"