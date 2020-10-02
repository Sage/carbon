Feature: Button Toggle component
  I want to test Button Toggle component properties

  @positive
  Scenario Outline: Set Button Toggle childen to <label>
    When I open default "Button Toggle" component in noIFrame with "buttonToggle" json from "commonComponents" using "<nameOfObject>" object name
    Then Button Toggle label on preview is <label>
    Examples:
      | label                        | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario Outline: Set button icon size to <size>
    When I open default "Button Toggle" component in noIFrame with "buttonToggle" json from "commonComponents" using "<nameOfObject>" object name
    Then Button Toggle icon height is <height> and width is <width>
    Examples:
      | size  | height | width | nameOfObject  |
      | small | 16     | 16    | iconSizeSmall |
      | large | 32     | 32    | iconSizeLarge |

  @ignore
  # @ignore until solution is applied to round sizes as integers as Chrome v80 has amended pixel sizes
  Scenario Outline: Set Button Toggle size to <size>
    When I open default "Button Toggle" component in noIFrame with "buttonToggle" json from "commonComponents" using "<nameOfObject>" object name
    Then Button Toggle height is <height> and width is <width>
    Examples:
      | size  | height | width | nameOfObject |
      | small | 40     | 94.25 | sizeSmall    |
      | large | 40     | 94.25 | sizeLarge    |

  @ignore
  # @ignore until solution is applied to round sizes as integers as Chrome v80 has amended pixel sizes
  Scenario Outline: Set Button Toggle size to <size> with small icon
    When I open default "Button Toggle" component in noIFrame with "buttonToggle" json from "commonComponents" using "<nameOfObject>" object name
    Then Button Toggle height is <height> and width is <width>
    Examples:
      | size  | height | width  | nameOfObject       |
      | small | 40     | 118.25 | sizeSmallIconSmall |
      | large | 40     | 118.25 | sizeLargeIconSmall |

  @positive
  Scenario Outline: Set Button Toggle size to <size> with large icon
    When I open default "Button Toggle" component in noIFrame with "buttonToggle" json from "commonComponents" using "<nameOfObject>" object name
    Then Button Toggle height is <height> and width is <width>
    Examples:
      | size  | height | width | nameOfObject       |
      | small | 104    | 138   | sizeSmallIconLarge |
      | large | 104    | 138   | sizeLargeIconLarge |

  @positive
  Scenario: Disable Button Toggle
    When I open default "Button Toggle" component in noIFrame with "buttonToggle" json from "commonComponents" using "disabled" object name
    Then Button Toggle is disabled

  @positive
  Scenario: Enable Button Toggle
    When I open default "Button Toggle" component in noIFrame with "buttonToggle" json from "commonComponents" using "disabledFalse" object name
    Then Button Toggle is enabled

  @positive
  Scenario: Enable Button Toggle grouped property
    When I open default "Button Toggle" component in noIFrame with "buttonToggle" json from "commonComponents" using "grouped" object name
    Then Button Toggle is grouped

  @positive
  Scenario: Disable Button Toggle grouped property
    When I open default "Button Toggle" component in noIFrame with "buttonToggle" json from "commonComponents" using "groupedFalse" object name
    Then Button Toggle is not grouped

  @positive
  Scenario: Change Button Toggle icon to analysis
    When I open default "Button Toggle" component in noIFrame with "buttonToggle" json from "commonComponents" using "buttonIconAnalysis" object name
    Then Button icon on preview is "analysis"

  @positive
  Scenario Outline: Verify the onChange event for Button Toggle
    Given I open "Button Toggle" component page
      And clear all actions in Actions Tab
    When I click on Button Toggle <index>
    Then onChange action was called in Actions Tab
    Examples:
      | index |
      | 0     |
      | 1     |
      | 2     |