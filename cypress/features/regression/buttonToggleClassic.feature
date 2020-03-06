@ignore
# @ignore until solution is applied to round sizes as integers as Chrome v80 has amended pixel sizes
Feature: Button Toggle classic component
  I want to change Button Toggle button size for classic story

  Background: Open Button Toggle component page classic
    Given I open "Button Toggle" component page classic

  @positive
  Scenario Outline: Set button icon size to <size>
    Given I select buttonIcon to "arrow_left"
    When I select buttonIconSize to "<size>"
    Then Button Toggle icon height is "<height>" and width is "<width>"
    Examples:
      | size  | height | width |
      | small | 16px   | 16px  |
      | large | 60px   | 60px  |

  @positive
  Scenario Outline: Set Button Toggle size to <size>
    When I select size to "<size>"
    Then Button Toggle height is "<height>" and width is "<width>"
    Examples:
      | size  | height | width     |
      | small | 27     | 55.921875 |
      | large | 49     | 97.125    |

  @positive
  Scenario Outline: Set Button Toggle size to <size> with small icon
    Given I select buttonIcon to "arrow_left"
    When I select buttonIconSize to "small"
      And I select size to "<size>"
    Then Button Toggle height is "<height>" and width is "<width>"
    Examples:
      | size  | height | width     |
      | small | 30     | 79.921875 |
      | large | 50     | 121.125   |

  @positive
  Scenario Outline: Set Button Toggle size to <size> with large icon
    Given I select buttonIcon to "arrow_left"
    When I select buttonIconSize to "large"
      And I select size to "<size>"
    Then Button Toggle height is "<height>" and width is "<width>"
    Examples:
      | size  | height | width |
      | small |  87    |  81   |
      | large | 109    | 115   |
