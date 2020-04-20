Feature: Deprecated Textbox component
  I want to change deprecated Textbox component properties

  Background: Open deprecated Textbox component page
    Given I open deprecated "Textbox" component page

  @positive
  @deprecated
  Scenario Outline: Set fieldHelp to <fieldHelp>
    When I set fieldHelp to "<fieldHelp>"
    Then fieldHelp is set to "<fieldHelp>"
    Examples:
      | fieldHelp               |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  @deprecated
  Scenario Outline: Set label to <label>
    When I set label to "<label>"
    Then label is set to "<label>"
    Examples:
      | label                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  @deprecated
  Scenario Outline: Set labelHelp to <labelHelp>
    When I set label to "label"
      And I set labelHelp to "<labelHelp>"
      And I hover mouse onto help icon
    Then tooltipPreview on preview is set to "<labelHelp>"
    Examples:
      | labelHelp               |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  @deprecated
  Scenario: Enable labelInline checkbox for a Textbox component
    When I check labelInline checkbox
    Then Textbox labelInline is enabled

  @positive
  @deprecated
  Scenario: Enable and disable labelInline checkbox for a Textbox component
    When I check labelInline checkbox
      And I uncheck labelInline checkbox
    Then Textbox labelInline is disabled

  @positive
  @deprecated
  Scenario Outline: Set labelWidth to <labelWidth>
    When I check labelInline checkbox
      And I set label width slider to <labelWidth>
    Then Textbox labelWidth is set to "<labelWidth>"
    Examples:
      | labelWidth |
      | 1          |
      | 299        |
      | 300        |

  @positive
  @deprecated
  Scenario Outline: Set inputWidth to <inputWidth>
    When I check labelInline checkbox
      And I set inputWidth slider to <inputWidth>
    Then inputWidth is set to "<inputWidth>"
    Examples:
      | inputWidth |
      | 1          |
      | 299        |
      | 300        |

  @positive
  @deprecated
  Scenario Outline: Set labelAlign to <labelAlign>
    When I check labelInline checkbox
      And I select labelAlign to "<labelAlign>"
    Then labelAlign on preview is "<labelAlign>"
    Examples:
      | labelAlign |
      | left       |
      | right      |

  @positive
  @deprecated
  Scenario Outline: Verify input of Textbox component
    When I input "<input>" into Textbox for deprecated component
    Then Textbox input on preview is set to "<input>" for deprecated component
    Examples:
      | input                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |