Feature: Configurable Items component
  I want to change Configurable Items component events

  Background: Open Configurable Items component page
    Given I open "Configurable Items" component page
      And clear all actions in Actions Tab

  @positive
  Scenario: Verify the drag function for Configurable Items component
    When I drag Configurable Items with iFrame "test 1" to 3
    Then dragged action was called in Actions Tab