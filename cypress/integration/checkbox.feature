Feature: Checkbox component
  I want to change Checkbox, reverse, fieldHelpInline, label, help label, input width, field help, labelInline, labelWidth, labelAlign properties

  Background: Open Checkbox component page
    Given I open "Checkbox" component page

  @positive
  Scenario: Enable reverse checkbox
    When I enable reverse checkbox
    Then checkbox helpText property is set to "reverse"

  @positive
  Scenario: Enable and disable reverse checkbox
    When I enable reverse checkbox
      And I disable reverse checkbox
    Then checkbox helpText property is not set to "reverse"

  @positive
  Scenario: Enable fieldHelpInline
    When I enable fieldHelpInline
    Then checkbox helpText property is set to "fieldHelpInline"

  @positive
  Scenario: Enable and disable fieldHelpInline
    When I enable fieldHelpInline
      And I disable fieldHelpInline
    Then checkbox helpText property is not set to "fieldHelpInline"

  @positive
  Scenario Outline: Change Checkbox component label
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
  Scenario Outline: Change Checkbox component label help
    When I set label help to "<labelHelp>"
      And I hover mouse on help icon
    Then Label help on preview is set to "<labelHelp>"
    Examples:
      | labelHelp                |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario Outline: Change Checkbox input width
    When I set input width slider to <width>
    Then checkbox input width is set to <width>
    Examples:
      | width |
      | 1     |
      | 10    |
      | 50    |

  @negative
  Scenario Outline: Set Checkbox input width out of scope
    When I set input width slider to <width>
    Then Checkbox input width is not set
    Examples:
      | width |
      | -1    |
      | 0     |
      | 51    |
      | 1000  |

  @positive
  Scenario Outline: Change Checkbox component field help
    When I set field help to "<fieldHelp>"
    Then Field help on preview is set to "<fieldHelp>"
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
    When I check label inline checkbox
    Then Checkbox label property is set to "inline"

  @positive
  Scenario: Enable and disable label inline checkbox
    When I check label inline checkbox
      And I uncheck label inline checkbox
    Then Checkbox label property is not set to "inline"

  @positive
  Scenario Outline: Change Checkbox label width
    When I check label inline checkbox
      And I set label width slider to <width>
    Then Checkbox label width is set to <width>
    Examples:
      | width |
      | 1     |
      | 10    |
      | 50    |

  @negative
  Scenario Outline: Set Checkbox input width out of scope
    When I check label inline checkbox
      And I set label width slider to <width>
    Then Checkbox label width is not set
    Examples:
      | width |
      | -1    |
      | 0     |
      | 51    |
      | 1000  |

  @positive
  Scenario Outline: Change Checkbox label align
    When I check label inline checkbox
      And I set label align "<direction>"
    Then direction on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |
