Feature: Design System Numeral Date component
  I want to test Design System Numeral Date component

  @positive
  Scenario: Verify that Numeral Date input doesn't allow type numeral character in inputs
    Given I open design systems controlled "Numeral Date" component in no iframe
      And I click on first input
    When I type no numeral characters "date" in inputs
    Then inputs have value ""

  @positive
  Scenario Outline: Check that <position> inputs have a character limit
    Given I open design systems controlled "Numeral Date" component in no iframe
      And I click on first input
    When I type numeral characters "<string>" in "<position>" inputs
    Then "<position>" numeral input is set to "<result>"
    Examples:
      | position | string | result |
      | first    | 123    | 12     |
      | second   | 123    | 12     |
      | third    | 12345  | 1234   |

  @positive
  Scenario: Set Numeral Date component date format to <dateFormat>
    When I open Test test_basic "Numeral Date" component in noIFrame with "numeralDate" json from "test" using "dateFormat" object name
    Then Date format in "first" input is set to 13
      And Date format in "second" input is set to 02
      And Date format in "third" input is set to 1990