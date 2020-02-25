Feature: Button component
  I want to check Button component properties

  Background: Open Button component default page
    Given I open "Button" component page

  @applitools
  Scenario Outline: Set Button size to <size>
    When I select size to "<size>"
    Then Element displays correctly
    Examples:
      | size   | height | width     |
      | small  | 32     | 136.4375  |
      | medium | 40     | 152.4375  |
      | large  | 48     | 182.78125 |

  @applitools
  Scenario: Disable Button
    Given I open "Button" component page
    When I disable Button component
    Then Element displays correctly
