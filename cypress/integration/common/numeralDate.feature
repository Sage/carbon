Feature: Numeral Date component
  I want to test Numeral Date component

  @positive
  Scenario: Verify that Numeral Date input doesn't allow type numeral character in inputs
    Given I open "Numeral Date Test" component page "default"
      And I click on first input
    When I type no numeral characters "date" in inputs
    Then inputs have value ""

  @positive
  Scenario Outline: Check that <position> inputs have a character limit
    Given I open "Numeral Date Test" component page "default"
      And I click on first input
    When I type numeral characters "<string>" in "<position>" inputs
    Then "<position>" numeral input is set to "<result>"
    Examples:
      | position | string | result |
      | first    | 123    | 12     |
      | second   | 123    | 12     |
      | third    | 12345  | 1234   |

  @positive
  Scenario: Set Numeral Date component date format to "13,02,1990"
    When I open default "Numeral Date Test" component with "numeralDate" json from "commonComponents" using "dateFormat" object name
    Then Date format in "first" input is set to 13
      And Date format in "second" input is set to 2
      And Date format in "third" input is set to 1990

  @positive
  Scenario Outline: Check visibility of warning on incorrect date entry
    Given I open "Numeral Date" component page "internal validation warning"
    When I type numeral characters "<string>" in "<position>" inputs and blur
    Then Warning validation is visible
    Examples:
      | position | string |
      | first    | 0      |
      | first    | 32     |
      | second   | 00     |
      | second   | 13     |
      | third    | 0000   |
      | third    | 1799   |
      | third    | 2201   |

  @positive
  Scenario Outline: Check numeral date does not display warning when input is empty
    Given I open "Numeral Date" component page "internal validation warning"
    When I leave "<position>" input empty and blur
    Then Warning icon should not be visible
    Examples:
      | position |
      | first    |
      | second   |
      | third    |