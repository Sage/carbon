Feature: Button Toggle Group component
  I want to change Button Toggle Group label, help label, input width, field help properties

  Background: Open Button Toggle Group component page
    Given I open "Button Toggle Group" component page

  @positive
  Scenario Outline: Change Button Toggle Group component label
    When I set label to "<label>"
    Then label on preview is "<label>"
    Examples:
      | label                    |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario Outline: Change Button Toggle Group component label help
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
      | <>                       |

  @positive
  Scenario Outline: Change Button Toggle Group input width
    When I set inputWidth to "<width>"
    Then inputWidth is set to "<width>"
    Examples:
      | width |
      | 1     |
      | 10    |
      | 100   |

  @negative
  Scenario Outline: Set out of scope characters to Button Toggle Group input width
    When I set inputWidth to "<width>"
    Then inputWidth is not set
    Examples:
      | width                   |
      | !@#$%^*()_+-=~[];:.,?{} |
      | 汉字                      |
      | <>                      |

  @positive
  Scenario Outline: Change Button Toggle Group component field help
    When I set fieldHelp to "<fieldHelp>"
    Then fieldHelp on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp                |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

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
  Scenario Outline: Change Button Toggle Group label width
    When I check labelInline checkbox
      And I set label width to "<width>"
    Then Label width is set to "<width>"
    Examples:
      | width |
      | 1     |
      | 10    |
      | 100   |

  @negative
  Scenario Outline: Set out of scope characters to Button Toggle Group input width
    When I set inputWidth to "<width>"
    Then Label width is not set
    Examples:
      | width                   |
      | !@#$%^*()_+-=~[];:.,?{} |
      | 汉字                     |
      | <>                      |

  @positive
  Scenario Outline: Change Toggle Button Group label align
    When I check labelInline checkbox
      And I set label align "<direction>"
    Then direction on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |
