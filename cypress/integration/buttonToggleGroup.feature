Feature: Button Toggle Group component
  I want to change Button Toggle Group label, help label, input width, field help properties

  Background: Open Button Toggle Group component page
    Given I open "Button Toggle Group" component page

  @positive
  Scenario Outline: Change Button Toggle Group component label to <label>
    When I set label to "<label>"
    Then label on preview is "<label>"
    Examples:
      | label                    |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario Outline: Change Button Toggle Group component label help to <labelHelp>
    When I set labelHelp to "<labelHelp>"
      And I hover mouse onto help icon
    Then tooltipPreview on preview is set to "<labelHelp>"
    Examples:
      | labelHelp                |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario Outline: Change Button Toggle Group input width to <width>
    When I check labelInline checkbox
      And I set inputWidth to "<width>"
    Then input width is set to "<px>"
    Examples:
      | width | px  |
      | 1     | 10  |
      | 10    | 98  |
      | 100   | 981 |

  @negative
  Scenario Outline: Set out of scope characters to Button Toggle Group input width to <width>
    When I check labelInline checkbox
      And I set inputWidth to "<width>"
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
      | fieldHelp                |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
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
    When I check labelInline checkbox
      And I set labelWidth to "<width>"
    Then label width is set to "<width>"
    Examples:
      | width |
      | 1     |
      | 10    |
      | 100   |

  @negative
  Scenario Outline: Set out of scope characters to Button Toggle Group input width to <width>
    When I check labelInline checkbox
      And I set inputWidth to "<width>"
    Then label width is not set "<width>"
    Examples:
      | width                   |
      | !@#$%^*()_+-=~[];:.,?{} |
      | 汉字                     |
      | <>                      |

  @positive
  Scenario Outline: Change Toggle Button Group label align to <direction>
    When I check labelInline checkbox
      And I select labelAlign to "<direction>"
    Then label Align on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |