Feature: Action Popover component
  I want to change Action Popover component properties

  Background: Open Action Popover component page
    Given I open "Action Popover Test" component page "default"

  @positive
  Scenario: Open Action Popover element
    When I click the menu button element
    Then Action Popover element is visible

  @positive
  Scenario Outline: Check <innerText> as inner context
    When I click the menu button element
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
  Scenario: Verify that the first element Business is focused using Home key
    Given I click the menu button element
      And I press keyboard "downarrow" key times 2
    When I press "Home" onto focused element
    Then focused element inner content is set to "Business"
      And Action Popover element has golden border on focus

  @positive
  Scenario: Verify that the first sub menu 1 element is focused using Home key for submenu
    Given I click the menu button element
      And I press keyboard "downarrow" key times 2
      And I wait 250
      And I press "leftarrow" onto focused element
      And I wait 250
      And I press keyboard "downarrow" key times 2
    When I press "Home" onto focused element
    Then focused element inner content is set to "Sub Menu 1"
      And Action Popover element has golden border on focus

  @positive
  Scenario Outline: Verify that the last element Delete is focused using <key> key
    When I click the menu button element
      And I press "<key>" onto focused element
    Then focused element inner content is set to "Delete"
      And Action Popover element has golden border on focus
    Examples:
      | key     |
      | uparrow |
      | End     |

  @positive
  Scenario: Verify that the last sub menu 3 element is focused using End key for submenu
    Given I click the menu button element
      And I press keyboard "downarrow" key times 2
      And I wait 250
      And I press "leftarrow" onto focused element
      And I wait 250
    When I press "End" onto focused element
    Then focused element inner content is set to "Sub Menu 3"
      And Action Popover element has golden border on focus

  @positive
  Scenario: Open Action Popover and close it using Tab key
    When I click the menu button element
      And I press Tab onto focused element
    Then Action Popover element is not visible

  @positive
  Scenario: Open Action Popover and close it using Shift Tab key
    When I click the menu button element
      And I press ShiftTab onto focused element
    Then Action Popover element is not visible

  @positive
  Scenario: Open Action Popover and close it using ESC key
    Given I click the menu button element
    When I press ESC onto focused element
    Then Action Popover element is not visible

  @positive
  Scenario: Close ActionPopover using ESC key if it hasn't a submenu
    Given I click the menu button element
      And I press keyboard "downarrow" key times 1
    When I press ESC onto focused element
    Then Action Popover element is not visible

  @positive
  Scenario: Close Action Popover using ESC key if it has a submenu
    Given I click the menu button element
      And I press keyboard "downarrow" key times 2
    When I press ESC onto focused element
    Then Action Popover element is not visible

  @positive
  Scenario: Open Action Popover and close it by clicking outside of the component
    Given I click the menu button element
    When I click onto root in Test directory
    Then Action Popover element is not visible

  @positive
  Scenario: Open Action Popover and close it by clicking onto Open icon
    Given I click the menu button element
    When I click the menu button element
    Then Action Popover element is not visible

  @positive
  Scenario Outline: Focus <innerText> element using different keyboard key <key>
    Given I click the menu button element
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
  Scenario Outline: Check submenu <innerText> as inner context
    When I click the menu button element
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
  Scenario Outline: Close Submenu and Action Popover after press Enter keyboard key
    Given I click the menu button element
      And I press keyboard "downarrow" key times 2
      And I wait 250
      And I press "leftarrow" onto focused element
      And I wait 250
      And I press keyboard "downarrow" key times <times>
    When I press "Enter" onto focused element
    Then Action Popover element is not visible
    Examples:
      | times |
      | 0     |
      | 1     |
      | 2     |

  @positive
  Scenario Outline: Close submenu after press ArrowRight keyboard key
    Given I click the menu button element
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
  Scenario Outline:  Close Submenu and Action Popover after press Esc keyboard key
    Given I click the menu button element
      And I press keyboard "downarrow" key times 2
      And I wait 250
      And I press "leftarrow" onto focused element
      And I wait 250
      And I press keyboard "downarrow" key times <times>
    When I press ESC onto focused element
    Then Action Popover element is not visible
    Examples:
      | times |
      | 0     |
      | 1     |
      | 2     |

  @positive
  Scenario Outline:  Close Submenu and Action Popover after clicking on the submenu
    Given I click the menu button element
      And I press keyboard "downarrow" key times 2
      And I wait 250
      And I press "leftarrow" onto focused element
      And I wait 250
      And I press keyboard "downarrow" key times <times>
    When I click <times> submenu actionPopoverInnerItem
    Then Action Popover element is not visible
    Examples:
      | times |
      | 0     |
      | 1     |

  @positive
  Scenario: Invoking Action Popover component in a hidden container
    Given I open "Action Popover" component page "in overflow hidden container"
      And I expand accordionRow using "Enter" key
    When I click the menu button element
    Then Action Popover element is visible

  @positive
  Scenario: Check that actionPopoverInnerItem has download prop
    Given I open "Action Popover" component page "with download button"
    When I click the menu button element
    Then Download button has href link "example-img.jpg" and download prop

  @positive
  Scenario: Show Action Popover list is positioned below in large viewport
    Given I open "Action Popover" component page "in overflow hidden container"
      And I have a large viewport
      And I expand accordionRow using "Enter" key
    When I click the menu button element
    Then Action Popover element is visible in bottom position

  @positive
  Scenario: Show Action Popover list is positioned above in small viewport
    Given I open "Action Popover" component page "in overflow hidden container"
      And I have a small viewport
      And I expand accordionRow using "Enter" key
    When I click the menu button element
      And I scroll accordion content to top
    Then Action Popover element is visible in top position