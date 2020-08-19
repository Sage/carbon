Feature: Loader default component
  I want to test Loader component properties

  @positive
  Scenario Outline: I set Loader component size to <size>
    When I open default "Loader" component in noIFrame with "loader" json from "commonComponents" using "<nameOfObject>" object name
    Then Loader width is set to 1281 px and height is set to <height> px
    Examples:
      | size  | height | nameOfObject |
      | small | 17     | sizeSmall    |
      | large | 19     | sizeLarge    |

  @positive
  Scenario Outline: Verify size of button with loader
    When I open default "Loader" component in noIFrame with "loader" json from "commonComponents" using "<nameOfObject>" object name
    Then button with loader width is set to <width> px and height is set to 40 px
    Examples:
      | size  | width | nameOfObject        |
      | small | 88    | isInsideButtonSmall |
      | large | 120   | isInsideButtonLarge |

  @positive
  Scenario: Loader isInsideButton
    When I open default "Loader" component in noIFrame with "loader" json from "commonComponents" using "isInsideButton" object name
    Then Loader isInsideButton and backgroundColor is "rgb(0, 129, 93)"

  @positive
  Scenario: Disabled loader button
    When I open default "Loader" component in noIFrame with "loader" json from "commonComponents" using "isActiveFalse" object name
    Then Loader button is disabled

  @positive
  Scenario: Enabled loader button
    When I open default "Loader" component in noIFrame with "loader" json from "commonComponents" using "isActive" object name
    Then Loader button is enabled

  @positive
  Scenario: Verify border outline color on focus
    Given I open default "Loader" component in noIFrame with "loader" json from "commonComponents" using "default" object name
    When I focus loader button
    Then loader button has golden border outline