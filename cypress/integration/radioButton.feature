Feature: Radio Button component
  I want to change Radio Button component properties

  Background: Open Radio Button component page
    Given I open "Radio Button" component page

  @positive
  Scenario Outline: Set fieldHelp to <fieldHelp>
    When I set fieldHelp to "<fieldHelp>"
    Then fieldHelp on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp               |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <> |

  @positive
  Scenario: Check fieldHelpInline checkbox
    When I check fieldHelpInline checkbox
    Then fieldHelpInline is enabled

  @positive
  Scenario: Uncheck fieldHelpInline checkbox
    When I check fieldHelpInline checkbox
      And I uncheck fieldHelpInline checkbox
    Then fieldHelpInline is disabled

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
  # @ignore because of FE-1447
  # | <> |

  @positive
  Scenario Outline: Check labelInline checkbox
    When I check labelInline checkbox
    Then RadioButton labelInline is enabled

  @positive
  Scenario Outline: Uncheck labelInline checkbox
    When I check labelInline checkbox
      And I uncheck labelInline checkbox
    Then RadioButton labelInline is disabled

  @positive
  Scenario Outline: Set labelHelp to <labelHelp>
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
  # @ignore because of FE-1447
  # | <> |

  @positive
  Scenario Outline: Set inputWidth to <inputWidth>
    When I set inputWidth to "<inputWidth>"
    Then inputWidth is set to "<inputWidth>"
    Examples:
      | inputWidth |
      | 0          |
      | 1          |
      | 10         |
      | 100        |

  @negative
  Scenario Outline: Set inputWidth out of scope to <inputWidth>
    When I set inputWidth to "<inputWidth>"
    Then inputWidth is not set
    Examples:
      | inputWidth              |
      | Sample text             |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |
      | -1                      |
      | -10                     |

  @positive
  Scenario Outline: Set labelWidth to <labelWidth>
    When I check labelInline checkbox
      And I set labelWidth to "<labelWidth>"
    Then RadioButton labelWidth is set to "<labelWidth>"
    Examples:
      | labelWidth |
      | 0          |
      | 1          |
      | 10         |
      | 100        |

  @negative
  Scenario Outline: Set labelWidth out of scope to <labelWidth>
    When I check labelInline checkbox
      And I set labelWidth to "<labelWidth>"
    Then label width is not set
    Examples:
      | labelWidth              |
      | Sample text             |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |
      | -1                      |
      | -10                     |

  @positive
  Scenario Outline: Set labelAlign to <labelAlign>
    When I check labelInline checkbox
      And I select labelAlign to "<direction>"
    Then labelAlign on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |