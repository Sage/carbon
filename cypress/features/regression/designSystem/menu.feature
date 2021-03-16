Feature: Design System Menu component
  I want to test the Design System Menu component

  @positive
  Scenario Outline: Test that the scroll block within a submenu is scrollable
    Given I open "Design System Menu" component page "scrollable-submenu" in no iframe
    When I open the "<position>" submenu
      And I scroll to the bottom of the block
    Then The last element is visible
    Examples:
      | position |
      | first    |
      | second   |

  @positive
  Scenario: Check the persistence of Menu component
    Given I open "Design System Menu" component page "default divider" in no iframe
    Then Menu elements are visible

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