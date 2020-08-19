Feature: Confirm component - in iFrame
  I want to test Confirm component in iFrame

  Background: Open Confirm component page
    Given I open "Confirm" component page with button

  @positive
  Scenario: Disable escape key
    When I check disableEscKey checkbox
      And I open component preview
      And I hit ESC key
    Then Confirm dialog is visible

  @positive
  Scenario: Enable escape key
    When I check disableEscKey checkbox
      And I uncheck disableEscKey checkbox
      And I open component preview
      And I hit ESC key
    Then Confirm dialog is not visible in iFrame

  @positive
  Scenario: Close icon enabled
    When I check showCloseIcon checkbox
      And I open component preview
      And I click close icon in IFrame
    Then Confirm dialog is not visible in iFrame

  @positive
  Scenario: Confirm dialog should dissapear after click onto cancelButton
    When I open component preview
      And I click on a cancelButton
    Then Confirm dialog is not visible in iFrame

  @positive
  Scenario: Confirm dialog should dissapear after click onto confirmButton
    When I open component preview
      And I click on a confirmButton
    Then Confirm dialog is not visible in iFrame

  @positive
  Scenario: Verify the open action for Confirm dialog
    Given clear all actions in Actions Tab
    When I open component preview
    Then open action was called in Actions Tab

  @positive
  Scenario: Verify the confirm action for Confirm dialog
    Given clear all actions in Actions Tab
      And I open component preview
    When I click on a confirmButton
    Then confirm action was called in Actions Tab

  @positive
  Scenario: Verify the cancel action for Confirm dialog
    Given clear all actions in Actions Tab
      And I open component preview
    When I click on a cancelButton
    Then cancel action was called in Actions Tab