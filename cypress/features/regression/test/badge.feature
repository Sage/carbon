Feature: Badge component
  I want to test Badge component properties

  Background: Open Badge component page
    Given I open "Design System Badge Test" component page "basic"

  @positive
  Scenario Outline: Set Badge component to <counter>
    When I set counter to "<counter>"
    Then Badge component counter is set to <counter>
    Examples:
      | counter |
      | 1       |
      | 99      |

  @positive
  Scenario Outline: Set Badge component to 3 digits to <counter>
    When I set counter to "<counter>"
    Then Badge component counter is set to 99
    Examples:
      | counter |
      | 100     |
      | 999     |

  @negative
  Scenario Outline: Set Badge component to out of scope to <counter>
    When I set counter to <counter> word
    Then Badge component counter does not exist
    Examples:
      | counter                      |
      | 0                            |
      | -12                          |
      | test                         |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario: Hover Badge component and verify that cross icon appears
    When I focus onto Badge component
    Then icon on preview is "cross"

  @positive
  Scenario: Click event
    Given clear all actions in Actions Tab
    When I click onto Badge component
    Then click action was called in Actions Tab