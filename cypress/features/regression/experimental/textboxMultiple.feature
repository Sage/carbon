Feature: Experimental Textbox multiple component
  I want to change Experimental Textbox multiple component properties

  Background: Open Experimental Textbox multiple component page
    Given I open "Experimental Textbox" component page multiple
 
  @positive
  Scenario Outline: Set placeholder to <placeholder>
    When I set placeholder to "<placeholder>"
    Then "First" textbox placeholder is set to "<placeholder>"
      And "Second" textbox placeholder is set to "<placeholder>"
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
  Scenario: Check disabled checkbox for a Textbox multiple component
    When I check disabled checkbox
    Then "First" textbox component is disabled
      And "Second" textbox component is disabled

  @positive
  Scenario: Uncheck disabled checkbox for a Textbox multiple component
    When I check disabled checkbox
      And I uncheck disabled checkbox
    Then "First" textbox component is not disabled
      And "Second" textbox component is not disabled

  @positive
  Scenario: Enable readOnly checkbox for a Textbox multiple component
    When I check readOnly checkbox
    Then "First" textbox component is readOnly
      And "Second" textbox component is readOnly

  @positive
  Scenario: Disable readOnly checkbox for a Textbox multiple component
    When I check readOnly checkbox
      And I uncheck readOnly checkbox
    Then "First" textbox component is not readOnly
      And "Second" textbox component is not readOnly

  @positive
  Scenario Outline: Set fieldHelp to <fieldHelp>
    When I set fieldHelp to "<fieldHelp>"
    Then "First" fieldHelp on preview is set to "<fieldHelp>"
      And "Second" fieldHelp on preview is set to "<fieldHelp>"
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
    Then "First" label is set to "<label>"
      And "Second" label is set to "<label>"
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
  Scenario Outline: Set labelHelp to <labelHelp>
    Given I set label to "label"
      And I set labelHelp to "<labelHelp>"
    When I hover mouse onto "first" help icon
      And I hover mouse onto "second" help icon
    Then "First" tooltipPreview on preview is set to "<labelHelp>"
      And "Second" tooltipPreview on preview is set to "<labelHelp>"
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
  Scenario: Enable labelInline checkbox for a Textbox multiple component
    When I set label to "label"
      And I check labelInline checkbox
    Then "First" textbox component is labelInline
      And "Second" textbox component is labelInline

  @positive
  Scenario: Enable and disable labelInline checkbox for a Textbox multiple component
    When I set label to "label"
      And I check labelInline checkbox
      And I uncheck labelInline checkbox
    Then "First" textbox component is not labelInline
      And "Second" textbox component is not labelInline

 @positive
  Scenario Outline: Set labelWidth to <labelWidth>
    When I set label to "label"
      And I check labelInline checkbox
      And I set label width slider to <labelWidth>
    Then "First" label width is set to "<labelWidth>"
      And "Second" label width is set to "<labelWidth>"
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
    Then "First" Textbox inputWidth is set to "<inputWidth>"
      And "Second" Textbox inputWidth is set to "<inputWidth>"
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
    Then "First" label Align on preview is "<labelAlign>"
      And "Second" label Align on preview is "<labelAlign>"
    Examples:
      | labelAlign |
      | left       |
      | right      |

  @positive
  Scenario Outline: Verify input of Textbox multiple component
    When I input "<input>" into "first" Textbox
      And I input "<input>" into "second" Textbox
    Then "First" textbox input on preview is set to "<input>"
      And "Second" textbox input on preview is set to "<input>"
    Examples:
      | input                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                     |