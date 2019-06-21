Feature: Rainbow component
  I want to change Rainbow component properties

  Background: Open Rainbow component page
    Given I open "Rainbow" component page

  @positive
  Scenario Outline: Set title to <title>
    When I set title to "<title>"
    Then Rainbow title is "<title>"
    Examples:
      | title                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Set color from json file
    When I put "rainbow" json to "data" input field
    Then color is set from "rainbow" json
    Examples:
      | json    |
      | rainbow |

  @positive
  Scenario Outline: Set name and label from json file
    When I put "rainbow" json to "data" input field
    Then name and label is set from "rainbow" json
    Examples:
      | json    |
      | rainbow |

  @positive
  Scenario Outline: Set tooltip from json file
    When I put "rainbow" json to "data" input field
    Then tooltip is set from "rainbow" json
    Examples:
      | json    |
      | rainbow |