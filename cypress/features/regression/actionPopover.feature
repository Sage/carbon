Feature: Action Popover component
  I want to change Alert component properties

  Background: Open Action Popover component page
    Given I open "Action Popover" component page
      And I open Action Popover element

  @positive
  Scenario: Open Action Popover element
    # When I open Action Popover element
    Then Action Popover element is visible

  @positive
  Scenario Outline: Open Action Popover element and check <innerText> as inner context
    When I press keyboard "downarrow" key times <times>
    Then Action Popover element "<index>" inner context is set to "<innerText>"
    Examples:
      | times | index | innerText     |
      | 0     | 1     | Email Invoice |
      | 1     | 2     | Print Invoice |
      | 2     | 3     | Download PDF  |
      | 3     | 4     | Download CSV  |
      | 4     | 6     | Delete        |

  @positive
  Scenario: Open Action Popover element, click on it and check email event
    When clear all actions in Actions Tab
      And I click 1 actionPopoverInnerItem
    Then email action was called in Actions Tab

  @positive
  Scenario: Open Action Popover element, click on it and check pdf event
    When clear all actions in Actions Tab
      And I click 3 actionPopoverInnerItem
    Then pdf action was called in Actions Tab

  @positive
  Scenario: Open Action Popover element, click on it and check csv event
    When clear all actions in Actions Tab
      And I click 4 actionPopoverInnerItem
    Then csv action was called in Actions Tab

  @positive
  Scenario: Open Action Popover element, click on it and check email event
    When clear all actions in Actions Tab
      And I click 6 actionPopoverInnerItem
    Then delete action was called in Actions Tab