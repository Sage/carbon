Feature: Action Popover component
  I want to change Alert component properties

  Background: Open Action Popover component page
    Given I open "Action Popover" component page
      And I click the menu button element with iFrame
      And clear all actions in Actions Tab

  @positive
  Scenario: check email event
    When I click 1 actionPopoverInnerItem
    Then email action was called in Actions Tab

  @positive
  Scenario: check csv event
    When I click 4 actionPopoverInnerItem
    Then csv action was called in Actions Tab

  @positive
  Scenario: check delete event
    When I click 6 actionPopoverInnerItem
    Then delete action was called in Actions Tab

  @positive
  Scenario: check email event for actions after pressing enter key
    When I press "enter" actionPopoverInnerItem onto 1 element
    Then email action was called in Actions Tab

  @positive
  Scenario: check csv event for actions after pressing enter key
    When I press "enter" actionPopoverInnerItem onto 4 element
    Then csv action was called in Actions Tab

  @positive
  Scenario: check delete event for actions after pressing enter key
    When I press "enter" actionPopoverInnerItem onto 6 element
    Then delete action was called in Actions Tab

  @positive
  Scenario Outline: <innerText> event for actions after click
    Given I press keyboard downarrow key times 2
      And I press leftarrow on focused element
      And I press keyboard downarrow key times <innerTimes>
    When I click <innerElement> submenu actionPopoverInnerItem
    Then "<innerText>" action was called in Actions Tab for actionPopover
    Examples:
      | innerText  | innerTimes | innerElement |
      | sub menu 1 | 0          | 0            |
      | sub menu 2 | 1          | 1            |

@positive
  Scenario Outline: <innerText> delete event for submenu actions after pressing enter key
    Given I press keyboard downarrow key times 2
      And I press leftarrow on focused element
      And I press keyboard downarrow key times <innerTimes>
    When I press enter submenu actionPopoverInnerItem onto <innerElement> element
    Then "<innerText>" action was called in Actions Tab for actionPopover
    Examples:
      | innerText  | innerTimes | innerElement |
      | sub menu 1 | 0          | 0            |
      | sub menu 2 | 1          | 1            |