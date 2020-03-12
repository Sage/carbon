Feature: Loader default component
  I want to change Loader component properties

  Background: Open Loader default component page
    Given I open "Loader" component page

  @positive
  Scenario Outline: I set Loader component size to <size>
    When I select size to "<size>"
    Then Loader width is set to 1061 px and height is set to <height> px
    Examples:
      | size  | height |
      | small | 17     |
      | large | 19     |

  @positive
  Scenario Outline: Verify size of button with loader
    Given I check isInsideButton checkbox
    When I select size to "<size>"
    Then button with loader width is set to <width> px and height is set to 40 px
    Examples:
      | size  | width |
      | small | 88    |
      | large | 120   |

  @positive
  Scenario: Loader isInsideButton
    When I check isInsideButton checkbox
    Then Loader isInsideButton and backgroundColor is "rgb(0, 128, 93)"

  @positive
  Scenario: Disabled loader button
    Given I check isInsideButton checkbox
    When I uncheck isActive checkbox
    Then Loader button is disabled

  @positive
  Scenario: Enabled loader button
    When I check isInsideButton checkbox
    Then Loader button is enabled

  @positive
  Scenario: Verify border outline color on focus
    Given I check isInsideButton checkbox
    When I focus loader button
    Then loader button has golden border outline