Feature: Design System Accordion component
  I want to test Design System Accordion component

  Background: Open Design System Accordion component page
    Given I open Design Systems primary "Accordion" component docs page

  @positive
  Scenario: I expand accordion using click
    When I expand Design System accordionRow via click
    Then accordionRow is expanded

  @positive
  Scenario: I expand accordion using Enter key
    When I expand accordionRow using "Enter" key
    Then accordionRow is expanded

  @positive
  Scenario: Verify border outline color on focus
    When I focus accordionRow
    Then accordionRow has golden border outline