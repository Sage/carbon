Feature: Button Toggle component
  I want to change Button Toggle children, button icon, button size, disabled, grouped properties

  Background: Open Button Toggle component page
    Given I open "Button Toggle" component page

  @positive @applitools
  Scenario Outline: Set Button Toggle childen to <label>
    When I set children to "<label>"
    Then Button Toggle label on preview is "<label>"
      And Element displays correctly
    Examples:
      | label                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <> |

  @ignore @applitools
  # @ignore until solution is applied to round sizes as integers as Chrome v80 has amended pixel sizes
  Scenario Outline: Set button icon size to <size>
    Given I select buttonIcon to "arrow_left"
    When I select buttonIconSize to "<size>"
    Then Button Toggle icon height is "<height>" and width is "<width>"
      And Element displays correctly
    Examples:
      | size  | height | width |
      | small | 16px   | 16px  |
      | large | 32px   | 32px  |

  @ignore @applitools
  # @ignore until solution is applied to round sizes as integers as Chrome v80 has amended pixel sizes
  Scenario Outline: Set Button Toggle size to <size>
    When I select size to "<size>"
    Then Button Toggle height is "<height>" and width is "<width>"
      And Element displays correctly
    Examples:
      | size  | height | width |
      | small | 40     | 94.25 |
      | large | 40     | 94.25 |

  @ignore @applitools
  # @ignore until solution is applied to round sizes as integers as Chrome v80 has amended pixel sizes
  Scenario Outline: Set Button Toggle size to <size> with small icon
    Given I select buttonIcon to "arrow_left"
    When I select buttonIconSize to "small"
      And I select size to "<size>"
    Then Button Toggle height is "<height>" and width is "<width>"
      And Element displays correctly
    Examples:
      | size  | height | width  |
      | small | 40     | 118.25 |
      | large | 40     | 118.25 |

  @ignore @applitools
  # @ignore until solution is applied to round sizes as integers as Chrome v80 has amended pixel sizes
  Scenario Outline: Set Button Toggle size to <size> with large icon
    Given I select buttonIcon to "arrow_left"
    When I select buttonIconSize to "large"
      And I select size to "<size>"
    Then Button Toggle height is "<height>" and width is "<width>"
      And Element displays correctly
    Examples:
      | size  | height | width |
      | small | 104    | 138   |
      | large | 104    | 138   |

  @positive @applitools
  Scenario: Disable Button Toggle
    When I disable Button component
    Then Button Toggle is disabled
      And Element displays correctly

  @positive @applitools
  Scenario: Enable Button Toggle
    Given I disable Button component
    When I enable Button component
    Then Button Toggle is enabled
      And Element displays correctly

  @positive @applitools
  Scenario: Enable Button Toggle grouped property
    When I check grouped checkbox
    Then Button Toggle is grouped
      And Element displays correctly

  @positive @applitools
  Scenario: Disable Button Toggle grouped property
    Given I check grouped checkbox
    When I uncheck grouped checkbox
    Then Button Toggle is not grouped
      And Element displays correctly

  @positive @applitools
  Scenario Outline: Verify the onChange event for Button Toggle
    Given clear all actions in Actions Tab
    When I click on Button Toggle <index>
    Then onChange action was called in Actions Tab
      And Element displays correctly
    Examples:
      | index |
      | 0     |
      | 1     |
      | 2     |