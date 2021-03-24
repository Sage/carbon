Feature: Design System Popover container component
  I want to test Design System Popover container component

  @positive
  Scenario: Popover container is opened
    Given I open "Design System Popover container" component page "default story" in no iframe
    When I open popover container in NoIFrame
    Then Popover container is visible

  @positive
  Scenario: Popover container is closed
    Given I open "Design System Popover container" component page "default story" in no iframe
      And I open popover container in NoIFrame
    When I click popover close icon
    Then Popover container is not visible

  @positive
  Scenario Outline: Open Popover container is opened using <key> key
    Given I open "Design System Popover container" component page "default story" in no iframe
    When I click onto popover setting icon using "<key>" key
    Then Popover container is visible
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario Outline: Open Popover container is closed using <key> key
    Given I open "Design System Popover container" component page "default story" in no iframe
      And I click onto popover setting icon using "<key>" key
    When I press onto closeIcon using "<key>" key
    Then Popover container is not visible
    Examples:
      | key   |
      | Enter |
      | Space |