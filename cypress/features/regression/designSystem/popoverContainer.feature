Feature: Design System Popover container component
  I want to test Design System Popover container component

  Background: Open Design System Popover container component page
    Given I open Design Systems basic "Popover container" component docs page

  @positive
  Scenario: Popover container is opened
    When I open popover container in basic component
    Then Popover container is visible

  @positive
  Scenario: Popover container is closed
    Given I open popover container in basic component
    When I click popover close icon
    Then Popover container is not visible

  @positive
  Scenario Outline: Open Popover container is opened using <key> key
    When I click onto popover setting icon using "<key>" key
    Then Popover container is visible
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario Outline: Open Popover container is closed using <key> key
    Given I click onto popover setting icon using "<key>" key
    When I press onto closeIcon using "<key>" key
    Then Popover container is not visible
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario: Popover container component is left aligned
    # commented because of BDD default scenario Given - When - Then
    # When I open basic Design System "Popover container" component docs page
    Then opening icon is on the "left" side
      And Popover component is opened the "left" side

  @positive
  Scenario: Popover container component is right aligned
    # commented because of BDD default scenario Given - When - Then
    # When I open basic Design System "Popover container" component docs page
    Then opening icon is on the "right" side
      And Popover component is opened the "right" side

  @positive
  Scenario: Verify open button is hide when the PopoverContainer is open
    When I open popover container in open component
    Then opening icon is hide