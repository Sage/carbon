Feature: Badge component
  I want to test Badge component properties

  @positive
  Scenario Outline: Set Badge component to <counter>
    When I open default "Badge Test" component with "badge" json from "commonComponents" using "<nameOfObject>" object name
    Then Badge component counter is set to <counter>
    Examples:
      | counter | nameOfObject |
      | 1       | counter1     |
      | 99      | counter99    |

  @positive
  Scenario Outline: Set Badge component to 3 digits to <counter>
    When I open default "Badge Test" component with "badge" json from "commonComponents" using "<nameOfObject>" object name
    Then Badge component counter is set to 99
    Examples:
      | counter | nameOfObject |
      | 100     | counter100   |
      | 999     | counter99    |

  @negative
  Scenario Outline: Set Badge component to out of scope to <counter>
    When I open default "Badge Test" component with "badge" json from "commonComponents" using "<nameOfObject>" object name
    Then Badge component counter does not exist
    Examples:
      | counter                      | nameOfObject            |
      | 0                            | counter0                |
      | -12                          | counter-12              |
      | test                         | counterTest             |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | counterSpecialCharacter |

  @positive
  Scenario: Hover Badge component and verify that cross icon appears
    Given I open default "Badge Test" component with "badge" json from "commonComponents" using "counter1" object name
    When I focus onto Badge component
    Then icon name on preview is "badge-cross-icon"
      And Badge component cross icon has proper color

  @positive
  Scenario: Click event
    Given I open "Badge Test" component page "default"
    When I click onto Badge component
    Then click action was called in Actions Tab