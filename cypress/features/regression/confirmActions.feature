Feature: Confirm component - in iFrame
  I want to test Confirm component in iFrame

  Background: Open Confirm component page
    Given I open "Confirm Test" component page "default"

  @positive
  Scenario: Verify the confirm action for Confirm dialog
    Given clear all actions in Actions Tab
    When I click on a confirmButton in IFrame
    Then confirm action was called in Actions Tab

  @positive
  Scenario: Verify the cancel action for Confirm dialog
    Given clear all actions in Actions Tab
    When I click on a cancelButton in IFrame
    Then cancel action was called in Actions Tab