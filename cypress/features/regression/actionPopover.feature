Feature: Action Popover component
  I want to change Alert component properties

  Background: Open Action Popover component page
    Given I open "Action Popover" component page
      And I open Action Popover component

  @positive
  Scenario: Open Action Popover component
    # When I open Action Popover component
    Then Action Popover component is visible

  @positive
  Scenario Outline: Open Action Popover component and check <innerText> as inner context
    When I press keyboard "downarrow" key times <times>
    Then Action Popover component "<index>" inner context is set to "<innerText>"
    Examples:
      | times | index | innerText     |
      | 0     | 1     | Email Invoice |
      | 1     | 2     | Print Invoice |
      | 2     | 3     | Download PDF  |
      | 3     | 4     | Download CSV  |
      | 4     | 6     | Delete        |

  @ignore
  # needs to be improved
  Scenario Outline: Open Action Popover component, click on it and check <event> event
    When clear all actions in Actions Tab
      And I click <index> actionPopoverInnerItem
    Then "<event>" action was called in Actions Tab
    Examples:
      | index | event  |
      | 1     | email  |
      | 3     | pdf    |
      | 4     | csv    |
      | 6     | delete |