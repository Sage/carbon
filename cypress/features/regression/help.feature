Feature: Help component
  I want to change Help component properties

  Background: Open Help component page
    Given I open "Help" component page

  @positive
  Scenario Outline: Change children to <children>
    When I set children to "<children>"
      And I hover mouse onto help icon
    Then  tooltipPreview on preview is set to "<children>"
    Examples:
      | children                |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Change tooltip position to <tooltipPosition>
    When I select tooltipPosition to "<tooltipPosition>"
      And I select tooltipAlign to "center"
      And I hover mouse onto help icon
    Then tooltipPosition is set to "<tooltipPosition>"
    Examples:
      | tooltipPosition |
      | left            |
      | right           |
      | top             |
      | bottom          |

  @positive
  Scenario Outline: Change tooltip align to <tooltipAlign>
    When I select tooltipAlign to "<tooltipAlign>"
      And I select tooltipPosition to "bottom"
      And I hover mouse onto help icon
    Then tooltipAlign is set to "<tooltipAlign>"
    Examples:
      | tooltipAlign |
      | center       |
      | bottom       |
      | left         |
      | right        |
      | top          |

  @positive
  Scenario Outline: Change href to <href>
    When I set href to "<href>"
    Then Help href on preview is set to "<href>"
    Examples:
      | href                    |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario: Verify default color for help icon
    # When I open "Help" component page
    Then icon on preview has "rgba(0, 0, 0, 0.65)" color