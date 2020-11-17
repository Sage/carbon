Feature: Confirm component - in iFrame
  I want to test Confirm component in iFrame

  Background: Open Confirm component page
    Given I open "Confirm Test" component page "default"

  @positive
  Scenario: Disable escape key
    Given I check disableEscKey checkbox
    When I hit ESC key
    Then Confirm dialog is visible

  @positive
  Scenario: Enable escape key
    Given I check disableEscKey checkbox
      And I uncheck disableEscKey checkbox
      # add wait due to re-render with new prop
      And I wait 500
    When I hit ESC key
    Then Confirm dialog is not visible in iFrame

  @positive
  Scenario: Close icon enabled
    Given I check showCloseIcon checkbox
    When I click closeIcon in IFrame
    Then Confirm dialog is not visible

  @positive
  Scenario: Confirm dialog should dissapear after click onto cancelButton
    When I click on a cancelButton
    Then Confirm dialog is not visible in iFrame

  @positive
  Scenario: Confirm dialog should dissapear after click onto confirmButton
    When I click on a confirmButton
    Then Confirm dialog is not visible in iFrame

  @positive
  Scenario: Verify the confirm action for Confirm dialog
    Given clear all actions in Actions Tab
    When I click on a confirmButton
    Then confirm action was called in Actions Tab

  @positive
  Scenario: Verify the cancel action for Confirm dialog
    Given clear all actions in Actions Tab
    When I click on a cancelButton
    Then cancel action was called in Actions Tab