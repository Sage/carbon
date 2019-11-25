Feature: Action Popover component
  I want to change Alert component properties

  Background: Open Action Popover component page
    Given I open "Action Popover" component page
      And I click the menu button element with iFrame
      And clear all actions in Actions Tab

  @positive
  Scenario: Open Action Popover element, click on it and check email event
    When I click 1 actionPopoverInnerItem
    Then email action was called in Actions Tab

  @positive
  Scenario: Open Action Popover element, click on it and check pdf event
    When I click 3 actionPopoverInnerItem
    Then pdf action was called in Actions Tab

  @positive
  Scenario: Open Action Popover element, click on it and check csv event
    When I click 4 actionPopoverInnerItem
    Then csv action was called in Actions Tab

  @positive
  Scenario: Open Action Popover element, click on it and check delete event
    When I click 6 actionPopoverInnerItem
    Then delete action was called in Actions Tab

  @positive
  Scenario: Open Action Popover and check email event for actions after pressing enter key
    When I press "enter" actionPopoverInnerItem onto 1 element
    Then email action was called in Actions Tab

  @positive
  Scenario: Open Action Popover and check pdf event for actions after pressing enter key
    When I press "enter" actionPopoverInnerItem onto 3 element
    Then pdf action was called in Actions Tab

  @positive
  Scenario: Open Action Popover and check csv event for actions after pressing enter key
    When I press "enter" actionPopoverInnerItem onto 4 element
    Then csv action was called in Actions Tab

  @positive
  Scenario: Open Action Popover and check delete event for actions after pressing enter key
    When I press "enter" actionPopoverInnerItem onto 6 element
    Then delete action was called in Actions Tab