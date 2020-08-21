Feature: Button Toggle Group component
  I want to test Button Toggle Group properties

  @positive
  Scenario Outline: Change Button Toggle Group component label to <label>
    When I open basic "Button Toggle Group Test" component in noIFrame with "buttonToggleGroup" json from "test" using "<nameOfObject>" object name
    Then Button Toggle Group label on preview is "<label>"
    Examples:
      | label                   | nameOfObject          |
      | mp150ú¿¡üßä             | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | labelSpecialCharacter |
  # @ignore because of FE-2782
  # | &"'<> |

  @positive
  Scenario Outline: Change Button Toggle Group component label help to <labelHelp>
    When I open basic "Button Toggle Group Test" component in noIFrame with "buttonToggleGroup" json from "test" using "<nameOfObject>" object name
      And I hover mouse onto help icon
    Then tooltipPreview on preview is set to <labelHelp> in NoIFrame
    Examples:
      | labelHelp               | nameOfObject              |
      | mp150ú¿¡üßä             | labelHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | labelHelpSpecialCharacter |
  # @ignore because of FE-2782
  # | &"'<>|

  @ignore
  # @ignore until solution is applied to round sizes as integers as Chrome v80 has amended pixel sizes
  Scenario Outline: Change Button Toggle Group input width to <width>
    Given I check labelInline checkbox
    When I set inputWidth to "<width>"
    Then input width is set to "<px>"
    Examples:
      | width | px        |
      | 1     | 10.75     |
      | 100   | 825.71875 |

  @negative
  Scenario: Set Button Toggle Group input width to out of scope characters
    When I open basic "Button Toggle Group Test" component in noIFrame with "buttonToggleGroup" json from "test" using "inputWidthOut" object name
    Then input width is not set to "TextáéíÄÖÜß!@#$%<>"

  @positive
  Scenario Outline: Change Button Toggle Group component field help to <fieldHelp>
    When I open basic "Button Toggle Group Test" component in noIFrame with "buttonToggleGroup" json from "test" using "<nameOfObject>" object name
    Then fieldHelp on preview is set to <fieldHelp> in NoIFrame
    Examples:
      | fieldHelp               | nameOfObject              |
      | mp150ú¿¡üßä             | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | fieldHelpSpecialCharacter |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario: Enable label inline checkbox
    When I open basic "Button Toggle Group Test" component in noIFrame with "buttonToggleGroup" json from "test" using "labelInline" object name
    Then Button Toggle Group component has label-inline property

  @positive
  Scenario: Disable label inline checkbox
    When I open basic "Button Toggle Group Test" component in noIFrame with "buttonToggleGroup" json from "test" using "labelInlineFalse" object name
    Then Button Toggle Group component does not have label-inline property

  @positive
  Scenario Outline: Change Button Toggle Group label width to <labelWidth>
    When I open basic "Button Toggle Group Test" component in noIFrame with "buttonToggleGroup" json from "test" using "<nameOfObject>" object name
    Then label width is set to "<labelWidth>" in NoIFrame
    Examples:
      | labelWidth | nameOfObject  |
      | 1          | labelWidth1   |
      | 100        | labelWidth100 |

  @negative
  Scenario: Set Button Toggle Group label width to out of scope characters
    When I open basic "Button Toggle Group Test" component in noIFrame with "buttonToggleGroup" json from "test" using "labelWidthOut" object name
    Then label width is not set "TextáéíÄÖÜß!@#$%<>"

  @positive
  Scenario Outline: Change Toggle Button Group label align to <labelAlign>
    When I open basic "Button Toggle Group Test" component in noIFrame with "buttonToggleGroup" json from "test" using "<nameOfObject>" object name
    Then label Align on preview is "<labelAlign>" in NoIFrame
    Examples:
      | labelAlign | nameOfObject    |
      | left       | labelAlignLeft  |
      | right      | labelAlignRight |

  @positive
  Scenario Outline: Verify the onChange  event for a Button Toggle Group <buttonName> button
    Given I open "Button Toggle Group Test" component page "basic"
      And clear all actions in Actions Tab
    When I click on Button Toggle Group "<buttonName>"
    Then onChange action was called in Actions Tab
    Examples:
      | buttonName |
      | Foo        |
      | Bar        |
      | Baz        |