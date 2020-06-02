Feature: Experimental Textbox multiple component
  I want to change Experimental Textbox multiple component properties

  Background: Open Experimental Textbox multiple component page
    Given I open "Experimental Textbox" component page multiple

  @positive
  Scenario Outline: Set placeholder to <placeholder>
    When I set placeholder to <placeholder> word
    Then Multiple Textbox placeholder is set to <placeholder>
    Examples:
      | placeholder                  |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario: Check disabled checkbox for a Textbox multiple component
    When I check disabled checkbox
    Then Textbox multiple component is disabled

  @positive
  Scenario: Uncheck disabled checkbox for a Textbox multiple component
    When I check disabled checkbox
      And I uncheck disabled checkbox
    Then Textbox multiple component is not disabled

  @positive
  Scenario: Enable readOnly checkbox for a Textbox multiple component
    When I check readOnly checkbox
    Then Textbox multiple component is readOnly

  @positive
  Scenario: Disable readOnly checkbox for a Textbox multiple component
    When I check readOnly checkbox
      And I uncheck readOnly checkbox
    Then Textbox multiple component is not readOnly

  @positive
  Scenario Outline: Set fieldHelp to <fieldHelp>
    When I set fieldHelp to <fieldHelp> word
    Then Multiple fieldHelp on preview is set to <fieldHelp>
    Examples:
      | fieldHelp                    |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario Outline: Set label to <label>
    When I set label to <label> word
    Then Multiple label is set to <label>
    Examples:
      | label                        |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario Outline: Set labelHelp to <labelHelp>
    Given I set label to "label"
      And I set labelHelp to <labelHelp> word
    When I hover mouse onto "first" help icon
      And I hover mouse onto "second" help icon
    Then Multiple tooltipPreview on preview is set to <labelHelp>
    Examples:
      | labelHelp                    |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario: Enable labelInline checkbox for a Textbox multiple component
    When I set label to "label"
      And I check labelInline checkbox
    Then Multiple Textbox component is labelInline

  @positive
  Scenario: Enable and disable labelInline checkbox for a Textbox multiple component
    When I set label to "label"
      And I check labelInline checkbox
      And I uncheck labelInline checkbox
    Then Multiple Textbox component is not labelInline

  @positive
  Scenario Outline: Set labelWidth to <labelWidth>
    When I set label to "label"
      And I check labelInline checkbox
      And I set label width slider to <labelWidth>
    Then Multiple label width is set to "<labelWidth>"
    Examples:
      | labelWidth |
      | 0          |
      | 25         |
      | 100        |

  @positive
  Scenario Outline: Set inputWidth to <inputWidth>
    When I set label to "label"
      And I check labelInline checkbox
      And I set inputWidth slider to <inputWidth>
    Then Multiple Textbox inputWidth is set to "<inputWidth>"
    Examples:
      | inputWidth |
      | 0          |
      | 50         |
      | 100        |

  @positive
  Scenario Outline: Set labelAlign to <labelAlign>
    When I set label to "label"
      And I check labelInline checkbox
      And I select labelAlign to "<labelAlign>"
    Then Multiple label Align on preview is "<labelAlign>"
    Examples:
      | labelAlign |
      | left       |
      | right      |

  @positive
  Scenario Outline: Verify input of Textbox multiple component
    When I type <input> into "first" Textbox
      And I type <input> into "second" Textbox
    Then Multiple textbox input on preview is set to <input>
    Examples:
      | input                        |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario Outline: Set label size to <size>
    When I select size to "<size>"
    Then Multiple Textbox height is "<height>"
      And Multiple Textbox width is "<width>"
    Examples:
      | size   | height | width  |
      | small  | 28px   | 1043px |
      | medium | 36px   | 1037px |
      | large  | 44px   | 1033px |