Feature: Alert component actions
  I want to check Alert component actions

  Background: Open Alert component page
    Given I open "Alert" component page with button

  @positive
  Scenario: Clicking close icon, closes Alert dialog
    When I open component preview
    Then closeIcon is visible in iframe
      And I click closeIcon in IFrame
      And Alert is not visible

  @positive
  Scenario: Disable escape key
    When I check disableEscKey checkbox
      And I open component preview
      And I hit ESC key
    Then Alert is visible

@positive
Scenario: Check open click event
  When clear all actions in Actions Tab
    And I open component preview
  Then open action was called in Actions Tab

@positive
Scenario: Check cancel click event
  Given clear all actions in Actions Tab
    And I open component preview
  When I click closeIcon in IFrame
  Then cancel action was called in Actions Tab