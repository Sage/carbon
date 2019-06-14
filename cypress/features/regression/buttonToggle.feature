Feature: Button Toggle component
  I want to change Button Toggle children, button icon, button size, disabled, grouped properties

  Background: Open Button Toggle component page
    Given I open "Button Toggle" component page

  @positive
  Scenario Outline: Set Button Toggle childen to <label>
    When I set children to "<label>"
    Then Button Toggle label on preview is "<label>"
    Examples:
      | label                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <> |

  @positive
  Scenario Outline: Set button icon size to <size>
    When I select buttonIcon to "arrow_left"
      And I select buttonIconSize to "<size>"
    Then Button icon height is "<height>" and width is "<width>"
    Examples:
      | size  | height | width |
      | small | 18px   | 16px  |
      | large | 60px   | 60px  |

  @positive
  Scenario Outline: Set Button Toggle size to <size>
    When I select size to "<size>"
    Then Button Toggle height is "<height>" and width is "<width>"
    Examples:
      | size  | height | width |
      | small | 26px   | 56px  |
      | large | 49px   | 97px  |

  @positive
  Scenario Outline: Set Button Toggle size to <size> with small icon
    When I select buttonIcon to "arrow_left"
      And I select buttonIconSize to "small"
      And I select size to "<size>"
    Then Button Toggle height is "<height>" and width is "<width>"
    Examples:
      | size  | height | width |
      | small | 29px   | 75px  |
      | large | 49px   | 97px  |

  @positive
  Scenario Outline: Set Button Toggle size to <size> with large icon
    When I select buttonIcon to "arrow_left"
      And I select buttonIconSize to "large"
      And I select size to "<size>"
    Then Button Toggle height is "<height>" and width is "<width>"
    Examples:
      | size  | height | width |
      | small | 86px   | 81px  |
      | large | 49px   | 97px  |

  @positive
  Scenario: Disable Button
    When I disable Button component
    Then Button Toggle is disabled

  @positive
  Scenario: Disable and enable Button
    When I disable Button component
      And I enable Button component
    Then Button Toggle is enabled

  @positive
  Scenario: Enable Button Toggle grouped property
    When I check grouped checkbox
    Then Button Toggle is grouped

  @positive
  Scenario: Enable and disable Button Toggle grouped property
    When I uncheck grouped checkbox
      And I enable Button component
    Then Button Toggle is not grouped
