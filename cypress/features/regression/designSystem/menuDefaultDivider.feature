Feature: Design Systems Menu component - divider story
  I want to check Design Systems Menu component default divider story properties

  Background: Open Design Systems Menu component default divider page
    Given I open "Design System Menu" component page "default_divider" in no iframe

  @positive
  Scenario: Check the persistence of Menu component
    # commented because of BDD default scenario Given - When - Then
    # When I open "Design System Menu" component page "default_divider" in no iframe
    Then Menu elements are visible

  @positive
  Scenario: Check the size of the second expandable element of Menu
    When I hover over third expandable Menu component
    Then Menu third expandable element has inner elements