Feature: Popover container component
  I want to test Popover container component

  @positive
  Scenario: Popover container is opened
    Given I open "Popover container" component page "default story"
    When I open popover container
    Then Popover container is visible

  @positive
  Scenario: Popover container is closed
    Given I open "Popover container" component page "default story"
      And I open popover container
    When I click popover close icon
    Then Popover container is not visible

  @positive
  Scenario Outline: Open Popover container is opened using <key> key
    Given I open "Popover container" component page "default story"
    When I click onto popover setting icon using "<key>" key
    Then Popover container is visible
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario Outline: Open Popover container is closed using <key> key
    Given I open "Popover container" component page "default story"
      And I click onto popover setting icon using "<key>" key
    When I press onto closeIcon using "<key>" key
    Then Popover container is not visible
    Examples:
      | key   |
      | Enter |
      | Space |