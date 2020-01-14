Feature: Experimental GroupedCharacter component classic page
  I want to change Experimental Grouped character component properties for classic page

  Background: Open Experimental GroupedCharacter component classic page
    Given I open "Experimental GroupedCharacter" component page classic

  @positive
  Scenario Outline: Set groups to <groups> and verify input
    When I input json to "groups" input field the "<groups>"
      And I put "<example>" example grouped character
    Then Input component value is set to "<result>"
    Examples:
      | groups | example   | result      |
      | first  | 1234567   | 1-23-456    |
      | second | 987654321 | 98765-432-1 |
      | third  | 123456789 | 12-3456-78  |

  @positive
  Scenario Outline: Set separator to <separator>
    When I set separator to "<separator>"
      And I put "<text>" example grouped character
    Then example grouped character is "<result>"
    Examples:
      | separator | text   | result   |
      | -         | 123456 | 12-34-56 |
      | ?         | sage   | sa?ge    |
      | #         | tests  | te#st#s  |
      | @         | a      | a        |
      | $         | ab     | ab       |
      | %         | abc    | ab%c     |
      | ^         | abcde  | ab^cd^e  |
      | !         | abcdef | ab!cd!ef |
      | *         | 123456 | 12*34*56 |

  @positive
  Scenario: Disable and enable GroupedCharacter component
    Given I check disabled checkbox
    When I uncheck disabled checkbox
    Then GroupedCharacter input component is not disabled

  @positive
  Scenario: Disable GroupedCharacter component
    When I check disabled checkbox
    Then GroupedCharacter input component is disabled

  @positive
  Scenario: Disable and enable readOnly property for GroupedCharacter component
    Given I check readOnly checkbox
    When I uncheck readOnly checkbox
    Then GroupedCharacter input component is not readonly

  @positive
  Scenario: Disable readOnly property for GroupedCharacter component
    When I check readOnly checkbox
    Then GroupedCharacter input component is readonly

  @positive
  Scenario Outline: Change fieldHelp text to <fieldHelp>
    When I set fieldHelp to "<fieldHelp>"
    Then fieldHelp on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp               |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Set label to <label>
    When I set label to "<label>"
    Then label on preview is "<label>"
    Examples:
      | label                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Check the <size> of GroupedCharacter Input and nothing should be changed
    When I select size to "<size>"
    Then GroupedCharacter input component size is set to "<size>" and has min-height set to 31 and paddings set to 6
    Examples:
      | size   |
      | small  |
      | medium |
      | large  |

  @positive
  Scenario Outline: Change labelHelp text to <labelHelp>
    Given I set label to "label"
      And I set labelHelp to "<labelHelp>"
    When I hover mouse onto help icon
    Then tooltipPreview on preview is set to "<labelHelp>"
    Examples:
      | labelHelp               |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario: Enable label inline
    Given I set label to "label"
    When I check labelInline checkbox
    Then Grouped character component label Inline is enabled for classic story

  @positive
  Scenario: Disable label inline
    Given I set label to "label"
      And I check labelInline checkbox
    When I uncheck labelInline checkbox
    Then GroupedCharacter component labelInline is disabled

  @positive
  Scenario Outline: Set label width to <labelWidth>
    Given I set label to "label"
      And I check labelInline checkbox
    When I set label width slider to <labelWidth>
    Then GroupedCharacter Input component labelWidth is set to "<labelWidth>"
    Examples:
      | labelWidth |
      | 1          |
      | 10         |
      | 100        |

  @positive
  Scenario Outline: Set input width to <inputWidth>
    Given I set label to "label"
      And I check labelInline checkbox
    When I set inputWidth slider to <inputWidth>
    Then GroupedCharacter Input component inputWidth is set to <inputWidth>
    Examples:
      | inputWidth |
      | 1          |
      | 10         |
      | 100        |

  @positive
  Scenario Outline: Set label align to <labelAlign>
    Given I set label to "label"
      And I check labelInline checkbox
    When I select labelAlign to "<labelAlign>"
    Then label Align on preview is "<labelAlign>"
    Examples:
      | labelAlign |
      | right      |
      | left       |