Feature: Badge component actions
  I want to test Badge component actions

  Background: Open Badge component page
    Given I open "Design System Badge Test" component page "default"

  @positive
  Scenario: Click event
    Given clear all actions in Actions Tab
    When I click onto Badge component
    Then click action was called in Actions Tab