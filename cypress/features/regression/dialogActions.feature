Feature: Dialog component actions in IFrame
  I want to test Dialog component - actions in IFrame    

  @positive
  Scenario: Cancel event
    Given I open "Dialog Test" component page "default"
      And clear all actions in Actions Tab
    When I click closeIcon in IFrame
    Then cancel action was called in Actions Tab