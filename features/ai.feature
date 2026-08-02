Feature: AI Framework
@ai-test
Scenario: Fill Inputs

Given I open "https://practice.expandtesting.com/inputs"

When AI executes

"""
Fill Number with 42
Fill Text with Playwright
Fill Date with 2025-01-01
Click Display Inputs
"""

Then AI verifies

"""
Verify Number equals 42
Verify Text equals Playwright
Verify Date equals 2025-01-01
"""