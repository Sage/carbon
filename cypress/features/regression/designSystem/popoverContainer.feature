Feature: Design System Popover container component
  I want to test Design System Popover container component

  @positive
  Scenario: Popover container is opened
    Given I open design systems basic "Popover container" component in no iframe
    When I open popover container
    Then Popover container is visible

  @positive
  Scenario: Popover container is closed
    Given I open design systems basic "Popover container" component in no iframe
      And I open popover container
    When I click popover close icon
    Then Popover container is not visible

  @positive
  Scenario Outline: Open Popover container is opened using <key> key
    Given I open design systems basic "Popover container" component in no iframe
    When I click onto popover setting icon using "<key>" key
    Then Popover container is visible
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario Outline: Open Popover container is closed using <key> key
    Given I open design systems basic "Popover container" component in no iframe
      And I click onto popover setting icon using "<key>" key
    When I press onto closeIcon using "<key>" key
    Then Popover container is not visible
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario: Popover container component is left aligned
    When I open design systems basic "Popover container" component in no iframe
    Then opening icon is on the "left" side
      And Popover component is opened the "left" side

  @positive
  Scenario: Popover container component is right aligned
    When I open design systems position "Popover container" component in no iframe
    Then opening icon is on the "right" side
      And Popover component is opened the "right" side

  @positive
  Scenario: Verify open button is hide when the PopoverContainer is open
    Given I open design systems cover_button "Popover container" component in no iframe
    When I open popover container in open component
    Then opening icon is hide