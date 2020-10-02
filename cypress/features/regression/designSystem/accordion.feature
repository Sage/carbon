Feature: Design System Accordion component
  I want to test Design System Accordion component

  Background: Open Design System Accordion component page
    Given I open design systems default_story "Accordion" component in no iframe

  @positive
  Scenario: I expand accordion using click
    When I expand Design System accordionRow via click in NoIFrame
    Then accordionRow is expanded

  @positive
  Scenario: I expand accordion using Enter key
    When I expand accordionRow using "Enter" key
    Then accordionRow is expanded

  @positive
  Scenario: Verify border outline color on focus
    When I focus first accordionRow
    Then accordionRow has golden border outline