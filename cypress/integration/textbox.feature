Feature: Textbox component
  I want to change Textbox component properties

# Added Experimental untill the component will be merged with master
  Background: Open Textbox component page
    Given I open "Experimental Textbox" component page basic

  @positive
  Scenario Outline: Set placeholder to <placeholder>
    When I set placeholder to "<placeholder>"
    Then Textbox placeholder is set to "<placeholder>"
      Examples:
      | placeholder             |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                    |

  @positive
  Scenario: Check disabled checkbox for a Textbox component
    When I check disabled checkbox
    Then Textbox component is disabled

  @positive
  Scenario: Uncehck disabled checkbox for a Textbox component
    When I check disabled checkbox
      And I uncheck disabled checkbox
    Then Textbox component is not disabled

  @positive
  Scenario: Enable readOnly checkbox for a Textbox component
    When I check readOnly checkbox
    Then Textbox component is readOnly

  @positive
  Scenario: Disable readOnly checkbox for a Textbox component
    When I check readOnly checkbox
      And I uncheck readOnly checkbox
    Then Textbox component is not readOnly

  @positive
  Scenario Outline: Set fieldHelp to <fieldHelp>
    When I set fieldHelp to "<fieldHelp>"
    Then fieldHelp is set to "<fieldHelp>"
      Examples:
      | fieldHelp               |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  #     # @ignore because of FE-1447
  #     # | <>                  |

  @positive
  Scenario Outline: Set label to <label>
    When I set label to "<label>"
    Then label is set to "<label>"
    Examples:
      | label                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                    |

  @positive
  Scenario Outline: Set errorMessage to <errorMessage>
    When I set errorMessage to "<errorMessage>"
      And I hover mouse onto icon
    Then tooltipPreview on preview is set to "<errorMessage>"
      And errorMessage is displayed properly with proper icon
    Examples:
      | errorMessage            |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                    |

  @positive
  Scenario Outline: Set infoMessage to <infoMessage>
    When I set infoMessage to "<infoMessage>"
      And I hover mouse onto icon
    Then tooltipPreview on preview is set to "<infoMessage>"
      And infoMessage is displayed properly with proper icon
    Examples:
      | infoMessage             |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                    |

  @positive
  Scenario Outline: Set warningMessage to <warningMessage>
    When I set warningMessage to "<warningMessage>"
      And I hover mouse onto icon
    Then tooltipPreview on preview is set to "<warningMessage>"
      And warningMessage is displayed properly with proper icon
    Examples:
      | warningMessage          |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                    |

  @positive
  Scenario Outline: Set labelHelp to <labelHelp>
    When I set label to "label"
      And I set labelHelp to "<labelHelp>"
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
      # | <>                     |

  @positive
  Scenario: Enable labelInline checkbox for a Textbox component
    When I set label to "label"
      And I check labelInline checkbox
    Then Textbox component is labelInline

  @positive
  Scenario: Enable and disable labelInline checkbox for a Textbox component
    When I set label to "label"
      And I check labelInline checkbox
      And I uncheck labelInline checkbox
    Then Textbox component is not labelInline

 @positive
  Scenario Outline: Set labelWidth to <labelWidth>
    When I set label to "label"
      And I check labelInline checkbox
      And I set label width slider to <labelWidth>
    Then label width is set to "<labelWidth>"
    Examples:
      | labelWidth |
      | 0          |
      | 1          |
      | 25         |
      | 75         |
      | 100        |

  @positive
  Scenario Outline: Set inputWidth to <inputWidth>
    When I set label to "label"
      And I check labelInline checkbox
      And I set inputWidth slider to <inputWidth>
    Then Textbox inputWidth is set to "<inputWidth>"
    Examples:
      | inputWidth |
      | 0          |
      | 1          |
      | 35         |
      | 50         |
      | 100        |

 @positive
  Scenario Outline: Set labelAlign to <labelAlign>
    When I set label to "label"
      And I check labelInline checkbox
      And I select labelAlign to "<labelAlign>"
    Then label Align on preview is "<labelAlign>"
    Examples:
      | labelAlign |
      | left       |
      | right      |

  @positive
  Scenario Outline: Verify input of Textbox component
    When I input "<input>" into Textbox
    Then Textbox input on preview is set to "<input>"
    Examples:
      | input                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                     |