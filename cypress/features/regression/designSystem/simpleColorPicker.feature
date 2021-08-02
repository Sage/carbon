Feature: Design System Simple Color Picker component
  I want to test Design System Simple Color Picker component

  @positive
  Scenario Outline: Set legend to <legend>
    When I open default "Design System Simple Color Picker Test" component in noIFrame with "simpleColorSelect" json from "designSystem" using "<nameOfObject>" object name
    Then simple color picker legend on preview is <legend> in NoIFrame
    Examples:
      | legend                       | nameOfObject           |
      | mp150ú¿¡üßä                  | legendOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | legendSpecialCharacter |

  @positive
  Scenario Outline: Set name to <name>
    When I open default "Design System Simple Color Picker Test" component in noIFrame with "simpleColorSelect" json from "designSystem" using "<nameOfObject>" object name
    Then simple color picker name <name> in NoIFrame
    Examples:
      | name                         | nameOfObject         |
      | mp150ú¿¡üßä                  | nameOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | nameSpecialCharacter |

  @positive
  Scenario: When avaiableColors prop is provided changes rendnered colors
    When I open "Design System Simple Color Picker Test" component page "default" in no iframe
    Then It renders with all colors with "simpleColorPicker" json

  @ignore
  # there is no possibility to pass an array as an argument via url
  Scenario: Color Picker renders all the provided colors and their respective labels
    When I open default "Design System Simple Color Picker Test" component in noIFrame with "simpleColorSelect" json from "designSystem" using "availableColors" object name
    Then It renders with all colors with "simpleColorPickerNew" json

  @positive
  Scenario: When on last color, going forward selects first color
    Given I open "Design System Simple Color Picker Test" component page "default" in no iframe
    When I press rightarrow on the 9 color
    Then Experimental Simple Color Picker 0 element was picked up

  @positive
  Scenario: When on first color, going backward selects last color
    Given I open "Design System Simple Color Picker Test" component page "default" in no iframe
    When I press leftarrow on the 0 color
    Then Experimental Simple Color Picker 9 element was picked up

  @positive
  Scenario: Left arrow moves selection left
    Given I open "Design System Simple Color Picker Test" component page "default" in no iframe
    When I press leftarrow on the 3 color
    Then Experimental Simple Color Picker 2 element was picked up

  @positive
  Scenario: Right arrow moves selection right
    Given I open "Design System Simple Color Picker Test" component page "default" in no iframe
    When I press rightarrow on the 3 color
    Then Experimental Simple Color Picker 4 element was picked up

  @positive
  Scenario: Up arrow moves selection up
    Given I open "Design System Simple Color Picker Test" component page "default" in no iframe
      And I select 6 color
    When I press uparrow on the 6 color
    Then Experimental Simple Color Picker 1 element was picked up

  @positive
  Scenario: Down arrow moves selection down
    Given I open "Design System Simple Color Picker Test" component page "default" in no iframe
    When I press downarrow on the 3 color
    Then Experimental Simple Color Picker 8 element was picked up

  @positive
  Scenario Outline: Check the Simple Color Picker <position> element was selected
    Given I open "Design System Simple Color Picker Test" component page "default" in no iframe
    When I pick <position> simple color input
    Then Experimental Simple Color Picker <position> element was picked up
    Examples:
      | position |
      | 1        |
      | 2        |
      | 3        |