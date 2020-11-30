Feature: Design System Card component
  I want to test Design System Card component

  @positive
  Scenario: Verify the shadow whithout interactive card
    Given I open "Design System Card" component page "default_story" in no iframe
    Then Card component has non-interactive shadow

  @positive
  Scenario: Verify the interactive card shadow
  Given I open "Design System Card" component page "interactive" in no iframe
    When I hover mouse onto Card component
    Then Card component has interactive shadow