Feature: Action Popover component in noIFrame
  I want to change Action Popover component properties in noIFrame

  Background: Open Action Popover component page in noIFrame
    Given I open "Test Action Popover" component in noiFrame

  @positive
  Scenario: Open Action Popover element
    When I click the menu button element in noiFrame
    Then Action Popover element is visible

  @positive
  Scenario Outline: check <innerText> as inner context
    When I click the menu button element in noiFrame
      And I press keyboard "downarrow" key times <times>
    Then focused element inner content is set to "<innerText>"
      And Action Popover element has golden border on focus
    Examples:
      | times | innerText     |
      | 0     | Business      |
      | 1     | Email Invoice |
      | 2     | Print Invoice |
      | 3     | Download PDF  |
      | 4     | Download CSV  |
      | 5     | Delete        |

  @positive
  Scenario Outline: Open Action Popover using different keyboard key <key>
    When I press keyboard "<key>" key times 1 on actionPopover open icon
    Then focused element inner content is set to "Business"
      And Action Popover element has golden border on focus
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario: Open Action Popover using downarrow keyboard key
    When I press downarrow on first element
    Then focused element inner content is set to "Business"
      And Action Popover element has golden border on focus

  @positive
  Scenario: verify that the first element Business is focused using Home key
    Given I click the menu button element in noiFrame
      And I press keyboard "downarrow" key times 2
    When I press "Home" onto focused element
    Then focused element inner content is set to "Business"
      And Action Popover element has golden border on focus

  @positive
  Scenario: verify that the first sub menu 1 element is focused using Home key for submenu
    Given I click the menu button element in noiFrame
      And I press keyboard "downarrow" key times 2
      And I wait 250
      And I press "leftarrow" onto focused element
      And I wait 250
      And I press keyboard "downarrow" key times 2
    When I press "Home" onto focused element
    Then focused element inner content is set to "Sub Menu 1"
      And Action Popover element has golden border on focus

  @positive
  Scenario: verify that the last element Delete is focused using Uparrow key
    When I click the menu button element in noiFrame
      And I press "uparrow" onto focused element
    Then focused element inner content is set to "Delete"
      And Action Popover element has golden border on focus

  @positive
  Scenario: verify that the last element Delete is focused using End key
    When I click the menu button element in noiFrame
      And I press "End" onto focused element
    Then focused element inner content is set to "Delete"
      And Action Popover element has golden border on focus

  @positive
  Scenario: verify that the last sub menu 3 element is focused using End key for submenu
    Given I click the menu button element in noiFrame
      And I press keyboard "downarrow" key times 2
      And I wait 250
      And I press "leftarrow" onto focused element
      And I wait 250
    When I press "End" onto focused element
    Then focused element inner content is set to "Sub Menu 3"
      And Action Popover element has golden border on focus

  @positive
  Scenario: Open Action Popover and close it using Tab key
    When I click the menu button element in noiFrame
      And I press "Tab" onto focused element
    Then Action Popover element is not visible

  @positive
  Scenario: Open Action Popover and close it using Shift Tab key
    When I click the menu button element in noiFrame
      And I press ShiftTab onto focused element
    Then Action Popover element is not visible

  @positive
  Scenario: Open Action Popover and close it using ESC key
    Given I click the menu button element in noiFrame
    When I press ESC onto focused element
    Then Action Popover element is not visible

  @positive
  Scenario: Close ActionPopover using ESC key if it hasn't a submenu
    Given I click the menu button element in noiFrame
      And I press keyboard "downarrow" key times 1
    When I press ESC onto focused element
    Then Action Popover element is not visible

  @positive
  Scenario: Action Popover is still open after using ESC key if it has a submenu
    Given I click the menu button element in noiFrame
      And I press keyboard "downarrow" key times 2
    When I press ESC onto focused element
    Then Action Popover element is visible

  @positive
  Scenario: Open Action Popover and close it by clicking outside of the component
    Given I click the menu button element in noiFrame
    When I click onto root in Test directory in iFrame
    Then Action Popover element is not visible

  @positive
  Scenario: Open Action Popover and close it by clicking onto Open icon
    Given I click the menu button element in noiFrame
    When I click the menu button element in noiFrame
    Then Action Popover element is not visible

  @positive
  Scenario Outline: focus <innerText> element using different keyboard key <key>
    Given I click the menu button element in noiFrame
    When I press "<key>" key times <times>
    Then Action Popover element is visible
      And focused element inner content is set to "<innerText>"
      And Action Popover element has golden border on focus
    Examples:
      | key | innerText     | times |
      | d   | Download PDF  | 1     |
      | d   | Download CSV  | 2     |
      | d   | Delete        | 3     |
      | e   | Email Invoice | 1     |
      | p   | Print Invoice | 1     |

  @positive
  Scenario Outline: check submenu <innerText> as inner context
    When I click the menu button element in noiFrame
      And I press keyboard "downarrow" key times 2
      And I press "leftarrow" onto focused element
      And I press keyboard "downarrow" key times <times>
    Then focused element inner content is set to "<innerText>"
      And Action Popover element has golden border on focus
    Examples:
      | innerText  | times |
      | Sub Menu 1 | 0     |
      | Sub Menu 2 | 1     |
      | Sub Menu 3 | 2     |

  @positive
  Scenario Outline: Close submenu after press Enter keyboard key
    Given I click the menu button element in noiFrame
      And I press keyboard "downarrow" key times 2
      And I wait 250
      And I press "leftarrow" onto focused element
      And I wait 250
      And I press keyboard "downarrow" key times <times>
    When I press "Enter" onto focused element
    Then ActionPopover submenu is not visible
    Examples:
      | times |
      | 0     |
      | 1     |
      | 2     |

  @positive
  Scenario Outline: Close submenu after press ArrowRight keyboard key
    Given I click the menu button element in noiFrame
      And I press keyboard "downarrow" key times 2
      And I wait 250
      And I press "leftarrow" onto focused element
      And I wait 250
      And I press keyboard "downarrow" key times <times>
    When I press "rightarrow" onto focused element
    Then ActionPopover submenu is not visible
    Examples:
      | times |
      | 0     |
      | 1     |
      | 2     |

  @positive
  Scenario Outline: Close submenu after press Esc keyboard key
    Given I click the menu button element in noiFrame
      And I press keyboard "downarrow" key times 2
      And I wait 250
      And I press "leftarrow" onto focused element
      And I wait 250
      And I press keyboard "downarrow" key times <times>
    When I press ESC onto focused element
    Then ActionPopover submenu is not visible
    Examples:
      | times |
      | 0     |
      | 1     |
      | 2     |