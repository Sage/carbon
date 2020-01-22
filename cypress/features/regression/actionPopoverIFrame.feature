Feature: Action Popover component
  I want to change Alert component properties

  Background: Open Action Popover component page
    Given I open "Action Popover" component in iframe

  @positive
  Scenario: Open Action Popover element
    When I click the menu button element
    Then Action Popover element is visible

  @positive
  Scenario Outline: Open Action Popover element and check <innerText> as inner context
    When I click the menu button element
      And I press keyboard "downarrow" key times <times>
    Then focused element inner content is set to "<innerText>"
      And Action Popover element has golden border on focus
    Examples:
      | times | innerText     |
      | 0     | Email Invoice |
      | 1     | Download PDF  |
      | 2     | Download CSV  |
      | 3     | Delete        |

  @positive
  Scenario Outline: Open Action Popover using different keyboard key <key>
    When I press keyboard "<key>" key times 1 on actionPopover open icon
    Then focused element inner content is set to "Email Invoice"
      And Action Popover element has golden border on focus
    Examples:
      | key       |
      | enter     |
      | space     |

  @positive
  Scenario: Open Action Popover using downarrow keyboard key
    When I press downarrow on focused element
    Then focused element inner content is set to "Email Invoice"
      And Action Popover element has golden border on focus

  @positive
  Scenario: Open Action Popover and verify that the first element Email Invoice is focused using Home key
    When I click the menu button element
      And I press Home on focused element
    Then focused element inner content is set to "Email Invoice"
      And Action Popover element has golden border on focus

  @positive
  Scenario: Open Action Popover and verify that the last element Delete is focused using Uparrow key
    When I click the menu button element
      And I press uparrow on focused element
    Then focused element inner content is set to "Delete"
      And Action Popover element has golden border on focus

  @positive
  Scenario: Open Action Popover and verify that the last element Delete is focused using End key
    When I click the menu button element
      And I press End on focused element
    Then focused element inner content is set to "Delete"
      And Action Popover element has golden border on focus

  @positive
  Scenario: Open Action Popover and close it using Tab key
    When I click the menu button element
      And I press Tab on focused element
    Then Action Popover element is not visible

  @positive
  Scenario: Open Action Popover and close it using Shift Tab key
    When I click the menu button element
      And I press ShiftTab on focused element
    Then Action Popover element is not visible

  @positive
  Scenario: Open Action Popover and close it using ESC key
    Given I click the menu button element
    When I press ESC on focused element
    Then Action Popover element is not visible

  @positive
  Scenario: Open Action Popover and close it by clicking outside of the component
    Given I click the menu button element
    When I click on outside dialog in iFrame
    Then Action Popover element is not visible

  @positive
  Scenario: Open Action Popover and close it by clicking onto Open icon
    Given I click the menu button element
    When I click the menu button element
    Then Action Popover element is not visible

  @positive
  Scenario Outline: Open Action Popover and focus <innerText> element using different keyboard key <key>
    Given I click the menu button element
    When I press keyboard "<key>" key times <times>
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