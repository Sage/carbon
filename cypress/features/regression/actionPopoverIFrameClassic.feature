Feature: Action Popover component classic
  I want to change Action Popover component properties for classic page

  Background: Open Action Popover component classic page
    Given I open "Action Popover" component for classic story in iframe

  @positive
  Scenario Outline: check <innerText> as inner context
    When I click the menu button element
      And I press keyboard downarrow key times <times>
    Then focused element inner content is set to "<innerText>"
      And Action Popover element has blue border on focus
    Examples:
      | times | innerText     |
      | 0     | Business      |
      | 1     | Email Invoice |
      | 2     | Print Invoice |
      | 3     | Download PDF  |
      | 4     | Download CSV  |
      | 5     | Delete        |

  @positive
  Scenario Outline: check submenu <innerText> as inner context
    Given I click the menu button element
      And I press keyboard downarrow key times <times>
      And I press leftarrow on focused element
    When I press keyboard downarrow key times <innerTimes>
    Then focused element inner content is set to "<innerText>"
      And Action Popover element has blue border on focus
    Examples:
      | times | innerText  | innerTimes |
      | 2     | Sub Menu 1 | 0          |
      | 2     | Sub Menu 2 | 1          |
      | 2     | Sub Menu 3 | 2          |