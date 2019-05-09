Feature: Help component
  I want to change Help component properties

  Background: Open Help component page
    Given I open "Help" component page

  @positive
  Scenario Outline: Change children
    When I set children to "<children>"
      And I hover mouse onto help icon
    Then  tooltipPreview on preview is set to "<children>"
    Examples:
      | children                |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Change tooltip position
    When I select tooltipPosition to "<tooltipPosition>"
      And I hover mouse onto help icon
    Then tooltipPosition is set to "<tooltipPosition>"
    Examples:
      | tooltipPosition |
      | left            |
      | right           |
      | top             |
      | bottom          |

  @positive
  Scenario Outline: Change tooltipAlign
    When I select tooltipAlign to "<tooltipAlign>"
      And I hover mouse onto help icon
    Then tooltipAlign is set to "<tooltipAlign>"
    Examples:
      | tooltipAlign |
      | left         |
      | right        |
      | top          |
      | bottom       |
      | center       |

  @positive
  Scenario Outline: Change href
    When I set href to "<href>"
    Then link on preview is "<href>"
    Examples:
      | href                    |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

