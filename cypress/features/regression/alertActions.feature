Feature: Alert component actions
  I want to check Alert component actions

  Background: Open Alert component page
    Given I open "Alert Test" component page

  @positive
  Scenario: Clicking close icon, closes Alert dialog
    # commented because of BDD default scenario Given - When - Then
    # When I open "Alert Test" component page
    Then closeIcon is visible in iframe
      And I click closeIcon in IFrame
      And Alert is not visible

  @positive
  Scenario: Disable escape key
    Given I check disableEscKey checkbox
    When I hit ESC key
    Then Alert is visible

@positive
Scenario: Check cancel click event
  Given clear all actions in Actions Tab
  When I click closeIcon in IFrame
  Then cancel action was called in Actions Tab