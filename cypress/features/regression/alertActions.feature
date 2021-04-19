Feature: Alert component actions
  I want to check Alert component actions  

  @positive
  Scenario: Check cancel click event
    Given I open "Alert Test" component page "default"
      And clear all actions in Actions Tab
    When I click closeIcon in IFrame
    Then cancel action was called in Actions Tab