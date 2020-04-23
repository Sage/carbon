Feature: Button Toggle Group component
  I want to change Button Toggle Group label, help label, input width, field help properties

  Background: Open Button Toggle Group component page
    Given I open basic Test "Button Toggle Group" component page

  @positive
  Scenario Outline: Change Button Toggle Group component label to <label>
    When I set label to "<label>"
    Then Button Toggle Group label on preview is "<label>"
    Examples:
      | label                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Change Button Toggle Group component label help to <labelHelp>
    When I set labelHelp to "<labelHelp>"
      And I hover mouse onto help icon
    Then tooltipPreview on preview is set to "<labelHelp>"
    Examples:
      | labelHelp               |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

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
    Given I check labelInline checkbox
    When I set inputWidth to "TextáéíÄÖÜß!@#$%<>"
    Then input width is not set to "TextáéíÄÖÜß!@#$%<>"

  @positive
  Scenario Outline: Change Button Toggle Group component field help to <fieldHelp>
    When I set fieldHelp to "<fieldHelp>"
    Then fieldHelp on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp               |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario: Enable label inline checkbox
    When I check labelInline checkbox
    Then Button Toggle Group component has label-inline property

  @positive
  Scenario: Disable label inline checkbox
    Given I check labelInline checkbox
    When I uncheck labelInline checkbox
    Then Button Toggle Group component does not have label-inline property

  @positive
  Scenario Outline: Change Button Toggle Group label width to <width>
    Given I check labelInline checkbox
    When I set labelWidth to "<width>"
    Then label width is set to "<width>"
    Examples:
      | width |
      | 1     |
      | 100   |

  @negative
  Scenario: Set Button Toggle Group label width to out of scope characters
    Given I check labelInline checkbox
    When I set labelWidth to "TextáéíÄÖÜß!@#$%<>"
    Then label width is not set "TextáéíÄÖÜß!@#$%<>"

  @positive
  Scenario Outline: Change Toggle Button Group label align to <direction>
    Given I check labelInline checkbox
    When I select labelAlign to "<direction>"
    Then label Align on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |

  @positive
  Scenario Outline: Verify the onChange  event for a Button Toggle Group <buttonName> button
    Given clear all actions in Actions Tab
    When I click on Button Toggle Group "<buttonName>"
    Then onChange action was called in Actions Tab
    Examples:
      | buttonName |
      | Foo        |
      | Bar        |
      | Baz        |