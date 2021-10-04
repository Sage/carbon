Feature: Simple Color Picker component
  I want to test Simple Color Picker component

  @positive
  Scenario Outline: Set legend to <legend>
    When I open default "Simple Color Picker Test" component with "simpleColorSelect" json from "commonComponents" using "<nameOfObject>" object name
    Then simple color picker legend on preview is <legend>
    Examples:
      | legend                       | nameOfObject           |
      | mp150ú¿¡üßä                  | legendOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | legendSpecialCharacter |

  @positive
  Scenario Outline: Set name to <name>
    When I open default "Simple Color Picker Test" component with "simpleColorSelect" json from "commonComponents" using "<nameOfObject>" object name
    Then simple color picker name <name>
    Examples:
      | name                         | nameOfObject         |
      | mp150ú¿¡üßä                  | nameOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | nameSpecialCharacter |

  @positive
  Scenario: When availableColors prop is provided changes rendered colors
    When I open "Simple Color Picker Test" component page "default"
    Then It renders with all colors with "simpleColorPicker" json

  @ignore
  # there is no possibility to pass an array as an argument via url
  Scenario: Color Picker renders all the provided colors and their respective labels
    When I open default "Simple Color Picker Test" component with "simpleColorSelect" json from "commonComponents" using "availableColors" object name
    Then It renders with all colors with "simpleColorPickerNew" json

  @positive
  Scenario Outline: Navigate in simpleColorPicker to the <colorWasPickedUp> colorIndex using <keyboardKey> keyboardKey starts from <colorToPressOn> colorIndex
    Given I open "Simple Color Picker Test" component page "default"
    When I press <keyboardKey> on the <colorToPressOn> color
    Then Experimental Simple Color Picker <colorWasPickedUp> element was picked up
    Examples:
      | keyboardKey | colorToPressOn | colorWasPickedUp |
      | rightarrow  | 9              | 0                |
      | leftarrow   | 0              | 9                |
      | leftarrow   | 3              | 2                |
      | rightarrow  | 3              | 4                |
      | downarrow   | 3              | 8                |

  @positive
  Scenario: Up arrow moves selection up
    Given I open "Simple Color Picker Test" component page "default"
      And I select 6 color
    When I press uparrow on the 6 color
    Then Experimental Simple Color Picker 1 element was picked up

  @positive
  Scenario Outline: Check the Simple Color Picker <position> element was selected
    Given I open "Simple Color Picker Test" component page "default"
    When I pick <position> simple color input
    Then Experimental Simple Color Picker <position> element was picked up
    Examples:
      | position |
      | 1        |
      | 2        |
      | 3        |