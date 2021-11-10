Feature: Action Popover component
  I want to change Action Popover component properties

  Background: Open Action Popover component page
    Given I open "Action Popover Test" component page "default"
      And I click the menu button element

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
  Scenario: check email event after pressing Enter key
    When I press "Enter" onto 1 actionPopoverInnerItem
    Then email action was called in Actions Tab

  @positive
  Scenario: check csv event after pressing Enter key
    When I press "Enter" onto 4 actionPopoverInnerItem
    Then csv action was called in Actions Tab

  @positive
  Scenario: check delete event after pressing Enter key
    When I press "Enter" onto 6 actionPopoverInnerItem
    Then delete action was called in Actions Tab

  @positive
  Scenario Outline: check <innerText> event after click
    When I click <innerElement> submenu actionPopoverInnerItem
    Then "<innerText>" action was called in Actions Tab for actionPopover
    Examples:
      | innerText  | innerElement |
      | sub menu 1 | 0            |
      | sub menu 2 | 1            |

  @positive
  Scenario Outline: check <innerText> event for submenu after pressing Enter key
    When I press Enter onto <innerElement> submenu actionPopoverInnerItem
    Then "<innerText>" action was called in Actions Tab for actionPopover
    Examples:
      | innerText  | innerElement |
      | sub menu 1 | 0            |
      | sub menu 2 | 1            |