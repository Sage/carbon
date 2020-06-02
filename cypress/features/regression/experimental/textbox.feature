Feature: Experimental Textbox component
  I want to change Experimental Textbox component properties

  Background: Open Experimental Textbox component page
    Given I open "Experimental Textbox" component page

  @positive
  Scenario Outline: Set placeholder to <placeholder>
    When I set placeholder to <placeholder> word
    Then Textbox placeholder is set to <placeholder>
    Examples:
      | placeholder                  |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario: Check disabled checkbox for a Textbox component
    When I check disabled checkbox
    Then Textbox component is disabled

  @positive
  Scenario: Uncheck disabled checkbox for a Textbox component
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
    When I set fieldHelp to <fieldHelp> word
    Then fieldHelp is set to <fieldHelp>
    Examples:
      | fieldHelp                    |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario Outline: Set label to <label>
    When I set label to <label> word
    Then label is set to <label>
    Examples:
      | label                        |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario Outline: Set labelHelp to <labelHelp>
    When I set label to "label"
      And I set labelHelp to <labelHelp> word
      And I hover mouse onto help icon
    Then tooltipPreview on preview is set to <labelHelp>
    Examples:
      | labelHelp                    |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

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
      | 25         |
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
    When I type <input> into Textbox
    Then Textbox input on preview is set to <input>
    Examples:
      | input                        |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario Outline: Set label size to <size>
    When I select size to "<size>"
    Then Textbox height is "<height>"
      And Textbox width is "<width>"
    Examples:
      | size   | height | width  |
      | small  | 28px   | 1043px |
      | medium | 36px   | 1037px |
      | large  | 44px   | 1033px |

  @positive
  Scenario: Check icon inside of Textbox is visible
    When I select inputIcon to "add"
    Then icon on preview is "add" and is visible

  @positive
  Scenario: Check iconOnClick event
    Given I select inputIcon to "add"
      And clear all actions in Actions Tab
    When I click on icon inside of Textbox
    Then iconOnClick action was called in Actions Tab

  @positive
  Scenario: Check onClick event
    Given clear all actions in Actions Tab
    When I click on Textbox
    Then onClick action was called in Actions Tab
      And Textbox input has golden border on focus