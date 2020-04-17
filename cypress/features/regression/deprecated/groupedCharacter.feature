Feature: Deprecated GroupedCharacter component
  I want to change deprecated Grouped character component properties

  Background: Open deprecated GroupedCharacter component page
    Given I open deprecated "GroupedCharacter" component page

  @positive
  @deprecated
  Scenario Outline: Set input width to <inputWidth>
    When I set inputWidth to "<inputWidth>"
    Then inputWidth is set to "<inputWidth>"
    Examples:
      | inputWidth |
      | 0          |
      | 1          |
      | 100        |

  @negative
  @deprecated
  Scenario Outline: Set input width out of scope to <inputWidth>
    When I set inputWidth to "<inputWidth>"
    Then inputWidth is not set
    Examples:
      | inputWidth              |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  @deprecated
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
  @deprecated
  Scenario Outline: Verify default separator while <text> the separator should be <result>
    When I put "<text>" example grouped character
    Then example grouped character is "<result>"
    Examples:
      | text   | result   |
      | 123456 | 12-34-56 |
      | abcdef | ab-cd-ef |

  @positive
  @deprecated
  Scenario Outline: Set label to <label>
    When I set label to "<label>"
    Then label on preview is "<label>"
    Examples:
      | label                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  @deprecated
  Scenario: Enable label inline
    When I check labelInline checkbox
    Then GroupedCharacter labelInline is enabled

  @positive
  @deprecated
  Scenario: Disable label inline
    When I check labelInline checkbox
      And I uncheck labelInline checkbox
    Then GroupedCharacter labelInline is disabled

  @positive
  @deprecated
  Scenario Outline: Set label width <labelWidth>
    When I check labelInline checkbox
      And I set labelWidth to "<labelWidth>"
    Then GroupedCharacter labelWidth is set to "<labelWidth>"
    Examples:
      | labelWidth |
      | 0          |
      | 1          |
      | 100        |

  @positive
  @deprecated
  Scenario Outline: Set label align to <labelAlign>
    When I check labelInline checkbox
      And I select labelAlign to "<labelAlign>"
    Then labelAlign on preview is "<labelAlign>"
    Examples:
      | labelAlign |
      | right      |
      | left       |

  @positive
  @deprecated
  Scenario Outline: Change labelHelp text to <labelHelp>
    When I set labelHelp to "<labelHelp>"
      And I hover mouse onto help icon
    Then tooltipPreview on preview is set to "<labelHelp>"
    Examples:
      | labelHelp               |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  @deprecated
  Scenario Outline: Change fieldHelp text to <fieldHelp>
    When I set fieldHelp to "<fieldHelp>"
    Then fieldHelp on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp               |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

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