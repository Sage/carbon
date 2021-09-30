Feature: Text Editor component with optional character limit
  I want to test Text Editor with optional character limit component

  Background: Open Text Editor component page
    Given I open "Text Editor" component page "with optional character limit"

  @positive
  Scenario: Verify that input doesn't allow to input more than character limit is set to
    When I type "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." in Text Editor
    Then Text Editor counter shows "0" characters left
      And input contains "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore " value