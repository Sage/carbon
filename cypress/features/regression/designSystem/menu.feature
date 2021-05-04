Feature: Design Systems Menu component
  I want to test the Design Systems Menu component

  @positive
  Scenario Outline: Test that the scroll block within a submenu is scrollable
    Given I open "Design System Menu" component page "scrollable submenu" in no iframe
    When I open the "<position>" submenu
      And I scroll to the bottom of the block
    Then The last element is visible
    Examples:
      | position |
      | first    |
      | second   |

  @positive
  Scenario: Check the size of the second expandable element of Menu
    Given I open "Design System Menu" component page "default divider" in no iframe
    When I hover over third expandable Menu component
    Then Menu third expandable element has inner elements

  @positive
  Scenario: Check that menu search has an alternate background colour
    Given I open "Design System Menu" component page "submenu with search" in no iframe
    When I hover over third expandable Menu component
    Then Inner menu search input has alternate "rgb(0, 51, 73)" background colour

  @positive
  Scenario: Check the size of divider is a large
    Given I open "Design System Menu" component page "default large divider" in no iframe
    When I hover over third expandable Menu component
    Then Menu divider has 4 px size

  @positive
  Scenario: Check the segment title is visible within a submenu
    Given I open "Design System Menu" component page "default segment title" in no iframe
    When I hover over third expandable Menu component
    Then "segment title" is visible

  @positive
  Scenario: Check alternate colour theme for submenu
    Given I open "Design System Menu" component page "default theme alternate colour" in no iframe
    When I hover over third expandable Menu component
    Then "fourth" submenu has alternate colour theme
      And "fifth" submenu has alternate colour theme
      And "sixth" submenu has alternate colour theme

  @negative
  Scenario: Check the default menu clickToOpen element does not open on hover
    Given I open "Design System Menu" component page "submenu options" in no iframe
    When I hover over default menu "sixth" expandable Menu component
    Then Menu "sixth" expandable component submenu is not visible

  @positive
  Scenario: Check the default menu clickToOpen element opens on mouse click
    Given I open "Design System Menu" component page "submenu options" in no iframe
    When I click default menu "sixth" expandable Menu component
    Then Menu "sixth" expandable element has inner elements

  @positive
  Scenario Outline: Check the default menu clickToOpen element opens using the "<key>" key
    Given I open "Design System Menu" component page "submenu options" in no iframe
      And I press tab from default menu "fourth" expandable Menu component 2 times
    When I press "<key>" onto focused element
    Then Menu "sixth" expandable element has inner elements
    Examples:
      | key       |
      | Enter     |
      | Space     |
      | downarrow |
      | uparrow   |