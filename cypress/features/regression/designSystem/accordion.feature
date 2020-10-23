Feature: Design System Accordion component
  I want to test Design System Accordion component

  @positive
  Scenario: I expand accordion using click
    Given I open "Design System Accordion" component page "default_story" in no iframe
    When I expand Design System accordionRow via click in NoIFrame
    Then accordionRow is expanded

  @positive
  Scenario: I expand accordion using Enter key
    Given I open "Design System Accordion" component page "default_story" in no iframe
    When I expand accordionRow using "Enter" key
    Then accordionRow is expanded

  @positive
  Scenario: Verify border outline color on focus
    Given I open "Design System Accordion" component page "default_story" in no iframe
    When I focus first accordionRow
    Then accordionRow has golden border outline

  @positive
  Scenario: Open accordion by clicking on validation icon
    Given I open "Design System Accordion" component page "validation_icon" in no iframe
    When I click on first validation icon
    Then accordionRow is expanded