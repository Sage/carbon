Feature: Menu component
  I want to test the Menu component

  @positive
  Scenario Outline: Test that the scroll block within a submenu is scrollable
    Given I open "Menu" component page "scrollable submenu"
    When I open the "<position>" submenu
      And I scroll to the bottom of the block
    Then The last element is visible
    Examples:
      | position |
      | first    |
      | second   |

  @positive
  Scenario: Check the size of the second expandable element of Menu
    Given I open "Menu" component page "default divider"
    When I hover over third expandable Menu component
    Then Menu third expandable element has inner elements

  @positive
  Scenario: Check that menu search has an alternate background colour
    Given I open "Menu" component page "submenu with search"
    When I hover over third expandable Menu component
    Then Inner menu search input has alternate "rgb(0, 51, 73)" background colour

  @positive
  Scenario: Check the size of divider is a large
    Given I open "Menu" component page "default large divider"
    When I hover over third expandable Menu component
    Then Menu divider has 4 px size

  @positive
  Scenario: Check the segment title is visible within a submenu
    Given I open "Menu" component page "default segment title"
    When I hover over third expandable Menu component
    Then "segment title" is visible

  @positive
  Scenario: Check alternate colour theme for submenu
    Given I open "Menu" component page "default theme alternate colour"
    When I hover over third expandable Menu component
    Then "fourth" submenu has alternate colour theme
      And "fifth" submenu has alternate colour theme
      And "sixth" submenu has alternate colour theme

  @negative
  Scenario: Check the default menu clickToOpen element does not open on hover
    Given I open "Menu" component page "submenu options"
    When I hover over default menu "sixth" expandable Menu component
    Then Menu "sixth" expandable component submenu is not visible

  @positive
  Scenario: Check the default menu clickToOpen element opens on mouse click
    Given I open "Menu" component page "submenu options"
    When I click default menu "sixth" expandable Menu component
    Then Menu "sixth" expandable element has inner elements

  @positive
  Scenario Outline: Check the default menu clickToOpen element opens using the "<key>" key
    Given I open "Menu" component page "submenu options"
      And I press tab from default menu "fourth" expandable Menu component 2 times
    When I press "<key>" onto focused element
    Then Menu "sixth" expandable element has inner elements
    Examples:
      | key       |
      | Enter     |
      | Space     |
      | downarrow |
      | uparrow   |

  @positive
  Scenario: Check that the Search component is focusable by using the downarrow key
    Given I open "Menu" component page "submenu with search"
      And I click onto root in Test directory
      And I hit Tab key 1 time
      And I wait 50
      And I press "Enter" onto focused element
      And I wait 50
    When I press keyboard "downarrow" key times 1
    Then Search component input should be focused

  @positive
  Scenario: Check that the Search component is focusable by using the uparrow key
    Given I open "Menu" component page "submenu with search"
      And I click onto root in Test directory
      And I hit Tab key 1 time
      And I wait 50
      And I press "Enter" onto focused element
      And I wait 50
      And I hit Tab key 2 time
      And I wait 50
    When I press keyboard "uparrow" key times 1
    Then Search component input should be focused

  @positive
  Scenario: Check that the Search component close icon is focusable in Menu when using keyboard navigation
    Given I open "Menu" component page "submenu with search"
      And I click onto root in Test directory
      And I hit Tab key 1 times
      And I wait 50
      And I press "Enter" onto focused element
      And I wait 50
      And I press keyboard "downarrow" key times 1
      And I wait 50
      And Type "FooBar" text into search input
      And I wait 50
    When I press Tab on Search component
    Then Search component input icon should be focused

  @positive
  Scenario: Check that the fullscreen menu is rendered properly
    When I open "Menu Test" component page "default"
    Then Menu is in fullscreen mode

  @positive
  Scenario: Check that the fullscreen menu is closed
    Given I open "Menu Test" component page "default"
    When I click closeIcon
    Then Menu is in fullscreen mode is not visible
  
  @positive
  Scenario: Check that close icon is focused in Fullscreen Menu
    Given I open "Menu Test" component page "default"
    When I hit Tab key 1 times
    Then closeIcon has the border outline color "rgb(255, 181, 0)" and width "3px"

  @positive
  Scenario: Check that inner Menu is available with tabbing in Fullscreen Menu
    Given I open "Menu Test" component page "default"
    When I hit Tab key 5 times
    Then "fourth" inner menu element is focused
  
  @positive
  Scenario: Check that previous inner Menu is available with shift tabbing in Fullscreen Menu
    Given I open "Menu Test" component page "default"
      And I hit Tab key 6 times
    When I press Shift Tab on focused element
    Then "fourth" inner menu element is focused

  @positive
  Scenario: Check that inner Menu without link is NOT available with tabbing in Fullscreen Menu
    Given I open "Menu Test" component page "default"
    When I hit Tab key 8 times
    Then inner menu without active redirection is not focused