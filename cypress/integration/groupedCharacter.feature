Feature: GroupedCharacter component
  I want to change Grouped character component properties

  Background: Open GroupedCharacter component page
    Given I open "GroupedCharacter" component page

  @positive
  Scenario Outline: Set input width
    When I set inputWidth to "<inputWidth>"
    Then inputWidth is set to "<inputWidth>"
    Examples:
      | inputWidth |
      | 0          |
      | 1          |
      | 10         |
      | 100        |

  @negative
  Scenario Outline: Set input width out of scope
    When I set inputWidth to "<inputWidth>"
    Then inputWidth is not set
    Examples:
      | inputWidth              |
      | Sample text             |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Set separator
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
  Scenario Outline: Verify default separator
    When I put "<text>" example grouped character
    Then example grouped character is "<result>"
    Examples:
      | text   | result   |
      | 123456 | 12-34-56 |
      | abcdef | ab-cd-ef |

  @positive
  Scenario Outline: Set label
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
  Scenario: Enable label inline
    When I check labelInline checkbox
    Then GroupedCharacter labelInline is enabled

  @positive
  Scenario: Disable label inline
    When I check labelInline checkbox
      And I uncheck labelInline checkbox
    Then GroupedCharacter labelInline is disabled

  @positive
  Scenario Outline: Set label width
    When I check labelInline checkbox
      And I set labelWidth to "<labelWidth>"
    Then GroupedCharacter labelWidth is set to "<labelWidth>"
    Examples:
      | labelWidth |
      | 0          |
      | 1          |
      | 10         |
      | 100        |

  @positive
  Scenario Outline: Set label align
    When I check labelInline checkbox
      And I select labelAlign to "<labelAlign>"
    Then labelAlign on preview is "<labelAlign>"
    Examples:
      | labelAlign |
      | right      |
      | left       |

  @positive
  Scenario Outline: Change labelHelp text
    When I set labelHelp to "<labelHelp>"
      And I hover mouse onto help icon
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
  Scenario Outline: Change fieldHelp text
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

  @ignore
  #not working on storybook neither carbon demo site
  Scenario: Enable field help inline
    When I check fieldHelpInline checkbox
    Then fieldHelpInline is enabled

  @ignore
  #not working on storybook neither carbon demo site
  Scenario: Disable label inline
    When I check fieldHelpInline checkbox
      And I uncheck fieldHelpInline checkbox
    Then fieldHelpInline is disabled
