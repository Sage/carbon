Feature: Action Popover component
  I want to change Action Popover component properties

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
  Scenario: check email event after pressing enter key
    When I press "enter" onto 1 actionPopoverInnerItem
    Then email action was called in Actions Tab

  @positive
  Scenario: check csv event after pressing enter key
    When I press "enter" onto 4 actionPopoverInnerItem
    Then csv action was called in Actions Tab

  @positive
  Scenario: check delete event after pressing enter key
    When I press "enter" onto 6 actionPopoverInnerItem
    Then delete action was called in Actions Tab

  @positive
  Scenario Outline: check <innerText> event after click
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
  Scenario Outline: check <innerText> delete event for submenu after pressing enter key
    Given I press keyboard downarrow key times 2
      And I press leftarrow on focused element
      And I press keyboard downarrow key times <innerTimes>
    When I press enter onto <innerElement> submenu actionPopoverInnerItem
    Then "<innerText>" action was called in Actions Tab for actionPopover
    Examples:
      | innerText  | innerTimes | innerElement |
      | sub menu 1 | 0          | 0            |
      | sub menu 2 | 1          | 1            |