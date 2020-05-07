Feature: Design System Numeral Date component
  I want to test Design System Numeral Date component

  Background: Open Design System Numeral Date component page
    Given I open Design Systems default_story "Numeral Date" component docs page

  @positive
  Scenario: Verify that Numeral Date input doesn't allow type numeral character in inputs
    Given I click on first input
    When I type no numeral characters "date" in inputs
    Then inputs have value ""

  @positive
  Scenario Outline: Check that <position> inputs have a character limit
    Given I click on first input
    When I type numeral characters "<string>" in "<position>" inputs
    Then "<position>" numeral input is set to "<result>"
    Examples:
      | position | string | result |
      | first    | 123    | 12     |
      | second   | 123    | 12     |
      | third    | 12345  | 1234   |