Feature: Simple Color Picker component
  I want to test Simple Color Picker component

  Background: Open Simple Color Picker component page
    Given I open "SimpleColorPicker" component page

  @positive
  Scenario Outline: Change Simple Color Picker name to <name>
    When I set name to "<name>"
    Then Simple Color Picker name on preview is set to "<name>"
    Examples:
      | name                    |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario Outline: Change Simple Color Picker availableColors to <availableColors>
    When I set availableColors to "<availableColors>"
    Then Simple Color Picker availableColors on preview is set to "<availableColors>" with rgb "<rgb>" parameter
    Examples:
      | availableColors               | rgb                                                                        |
      # comented, this functionality doesn't work on Electron / IE
      # | #AAAAAA,#FFFF00,#ED1C5F       | rgb(170, 170, 170);rgb(255, 255, 0);rgb(237, 28, 95)                       |
      # | #C8DCFC4C,#255BC719,#92007699 | rgba(200, 220, 252, 0.298);rgba(37, 91, 199, 0.098);rgba(146, 0, 118, 0.6) |
      # | #CAC1DC59,#067B5BE6,#BAFA61   | rgba(202, 193, 220, 0.35);rgba(6, 123, 91, 0.9);rgb(186, 250, 97)          |
      # | #7DBE27,#273B0C,#00FF0080     | rgb(125, 190, 39);rgb(39, 59, 12);rgba(0, 255, 0, 0.5)                     |

  @positive
  Scenario Outline: Change Simple Color Picker availableColors to <availableColors> and check the length of elements
    When I set availableColors to "<availableColors>"
    Then Simple Color Picker availableColors on preview is set to "<length>"
    Examples:
      | availableColors         | length |
      | #AAAAAA                 | 1      |
      | #C8DCFC,#FFFF00         | 2      |
      | #AAAAAA,#255BC7,#ED1C5F | 3      |

  @positive
  Scenario Outline: Check the Simple Color Picker <position> element was selected
    When clear all actions in Actions Tab
      And I pick <position> color
    Then Simple Color Picker <position> element was picked up
      And select action was called in Actions Tab
    Examples:
      | position |
      | 1        |
      | 2        |
      | 3        |