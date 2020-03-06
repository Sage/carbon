Feature: Accordion grouped component
  I want to change Accordion grouped component properties

  Background: Open Accordion grouped component page
    Given I open grouped Test "Accordion" component page in noIframe

  @positive
  Scenario Outline: Navigate through all grouped accordion rows using downarrow key
    Given I focus first accordionRow
    When I press keyboard downarrow key <count> times
    Then Accordion <accordion> row is focused
    Examples:
      | count | accordion |
      | 0     | 0         |
      | 1     | 1         |
      | 2     | 2         |
      | 3     | 0         |

  @positive
  Scenario: Navigate to the last grouped accordion row using End key
    Given I focus first accordionRow
    When I press End on focused element
    Then Accordion 2 row is focused

  @positive
  Scenario: Navigate to the first grouped accordion row using Home key
    Given I focus last accordionRow
    When I press Home on focused element
    Then Accordion 0 row is focused