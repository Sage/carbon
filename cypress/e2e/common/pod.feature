Feature: Pod component
  I want to test Pod component

  @positive
  Scenario: Check the triggerEditOnContent checkbox
    When I open Default "Pod Test" component with "pod" json from "commonComponents" using "triggerEditOnContent" object name
    Then Pod component has triggerEditOnContent property

  @positive
  Scenario: Edit button is visible on hover
    Given I open "Pod" component page "with display edit button on hover"
    When I check that onEdit icon is not visible
      And I hover mouse onto pod
    Then The onEdit icon is visible

  @positive
  Scenario: Check the edit event
    Given I open Default "Pod Test" component with "pod" json from "commonComponents" using "onEdit" object name
    When I click onEdit icon
    Then onEdit action was called in Actions Tab