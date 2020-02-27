Feature: Button Toggle Group component
  I want to change Button Toggle Group label, help label, input width, field help properties

  Background: Open Button Toggle Group component page
    Given I open "Button Toggle Group" component page

  @positive
  Scenario Outline: Change Button Toggle Group component label to <label>
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
  # | <>                       |

  @positive
  Scenario Outline: Change Button Toggle Group component label help to <labelHelp>
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
  # | <>                       |

  @positive
  Scenario Outline: Change Button Toggle Group input width to <width>
    Given I check labelInline checkbox
    When I set inputWidth to "<width>"
    Then input width is set to "<px>"
    Examples:
      | width | px        |
      | 1     | 10.75     |
      | 10    | 107.59375 |
      | 100   | 825.71875 |

  @negative
  Scenario Outline: Set out of scope characters to Button Toggle Group input width to <width>
    Given I check labelInline checkbox
    When I set inputWidth to "<width>"
    Then input width is not set to "<width>"
    Examples:
      | width                   |
      | !@#$%^*()_+-=~[];:.,?{} |
      | 汉字                     |
      | <>                      |

  @positive
  Scenario Outline: Change Button Toggle Group component field help to <fieldHelp>
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
  # | <>                       |

  @positive
  Scenario: Enable label inline checkbox
    When I check labelInline checkbox
    Then Button Toggle Group component has label-inline property

  @positive
  Scenario: Enable and disable label inline checkbox
    When I check labelInline checkbox
      And I uncheck labelInline checkbox
    Then Button Toggle Group component do not have label-inline property

  @positive
  Scenario Outline: Change Button Toggle Group label width to <width>
    Given I check labelInline checkbox
    When I set labelWidth to "<width>"
    Then label width is set to "<width>"
    Examples:
      | width |
      | 1     |
      | 10    |
      | 100   |

  @negative
  Scenario Outline: Set out of scope characters to Button Toggle Group input width to <width>
    Given I check labelInline checkbox
    When I set inputWidth to "<width>"
    Then label width is not set "<width>"
    Examples:
      | width                   |
      | !@#$%^*()_+-=~[];:.,?{} |
      | 汉字                    |
      | <>                      |

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
  Scenario Outline: Verify the onChange event for a Button Toggle Group <button>
    Given clear all actions in Actions Tab
    When I click on Button Toggle Group "<button>"
    Then <action> action was called in Actions Tab
    Examples:
      | button | action   |
      | Foo    | onChange |
  # @ignore until component default state of selected is removed for FE-2346
  # | Bar    | onChange |
      | Baz    | onChange |