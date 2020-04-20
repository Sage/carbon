Feature: Simple Color Picker component
  I want to test Simple Color Picker component

  Background: Open Simple Color Picker component default page
    Given I open "Experimental Simple Color Picker" component page

  @positive
  Scenario: When avaiableColors prop is provided changes rendnered colors
    Given It renders with all colors
    When I input new color json into "availableColors" input field
    Then It renders with all new colors

  @positive
  Scenario: Color Picker renders all the provided colors and their respective labels
    # commented because of BDD default scenario Given - When - Then
    # When I open "Experimental Simple Color Picker" component page
    Then It renders with all colors

  @positive
  Scenario: When on last color, going forward selects first color
    When I press rightarrow on the 10 color
    Then Experimental Simple Color Picker 1 element was picked up

  @positive
  Scenario: When on first color, going backward selects last color
    When I press leftarrow on the 1 color
    Then Experimental Simple Color Picker 10 element was picked up

  @positive
  Scenario: Left arrow moves selection left
    When I press leftarrow on the 3 color
    Then Experimental Simple Color Picker 2 element was picked up

  @positive
  Scenario: Right arrow moves selection right
    When I press rightarrow on the 3 color
    Then Experimental Simple Color Picker 4 element was picked up

  @positive
  Scenario: Up arrow moves selection up
    Given I select 6 color
    When I press uparrow on the 6 color
    Then Experimental Simple Color Picker 1 element was picked up

  @positive
  Scenario: Down arrow moves selection down
    When I press downarrow on the 3 color
    Then Experimental Simple Color Picker 8 element was picked up

  @positive
  Scenario Outline: Check the Simple Color Picker <position> element was selected
    When I pick <position> simple color input
    Then Experimental Simple Color Picker <position> element was picked up
    Examples:
      | position |
      | 1        |
      | 2        |
      | 3        |
