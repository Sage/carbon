Feature: Accordion component
  I want to test Accordion component

  @positive
  Scenario: I expand accordion using click
    Given I open "Accordion" component page "default story"
    When I expand default accordionRow via click
    Then accordionRow is expanded

  @positive
  Scenario: I expand accordion using Enter key
    Given I open "Accordion" component page "default story"
    When I expand accordionRow using "Enter" key
    Then accordionRow is expanded

  @positive
  Scenario: Verify border outline color on focus
    Given I open "Accordion" component page "default story"
    When I focus first accordionRow
    Then accordionRow has golden border outline

  @positive
  Scenario: Open accordion by clicking on validation icon
    Given I open "Accordion" component page "validation icon"
    When I click on first validation icon
    Then accordionRow is expanded