Feature: Experimental RadioButton weekly component
  I want to change Experimental RadioButton weekly component properties

  Background: Open Experimental RadioButton weekly component page
    Given I open "Experimental RadioButton" component page
      And "weekly" tab in "second" tab list is visible
      And I open weekly tab

  @positive
  Scenario Outline: Change RadioButton component weekly label to <label>
    When I set "weekly" "label" to "<label>"
    Then "First" radioButton on preview is "<label>"
    Examples:
      | label                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Change RadioButton component weekly help label to <labelHelp>
    When I set "weekly" "labelHelp" to "<labelHelp>"
      And I hover mouse onto "first" help icon
    Then tooltipPreview on preview is set to "<labelHelp>"
    Examples:
      | labelHelp               |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Change RadioButton component weekly value to <weeklyValue>
    When I set "weekly" "value" to "<weeklyValue>"
    Then "First" RadioButton has value "<weeklyValue>"
    Examples:
      | weeklyValue             |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario: Disable RadioButton
    When I check weekly disabled checkbox
    Then "First" RadioButton component is disabled

  @positive
  Scenario: Disable and enable checkbox
    When I check weekly disabled checkbox
      And I uncheck weekly disabled checkbox
    Then "First" RadioButton component is enabled

  @positive
  Scenario: Enable reverse radioButton
    When I check weekly reverse checkbox
    Then "First" RadioButton is set to reverse

  @positive
  Scenario: Enable and disable reverse checkbox
    # Given I open weekly tab
    Then "First" RadioButton is not set to reverse

  @positive
  Scenario Outline: Change RadioButton size to <size>
    When I select weekly size to "<size>"
    Then "First" RadioButton size on preview is set to "<size>"
    Examples:
      | size  |
      | small |
      | large |

  @positive
  Scenario Outline: Change RadioButton component field help to <fieldHelp>
    When I set "weekly" "fieldHelp" to "<fieldHelp>"
    Then "First" fieldHelp on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp               |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario: Enable fieldHelpInline
    When I check weekly fieldHelpInline checkbox
    Then "First" field help is set to fieldHelpInline and has margin-left set to "32px" and has margin-right "0px"

  @positive
  Scenario: Enable and disable fieldHelpInline
    When I check weekly fieldHelpInline checkbox
      And I uncheck weekly fieldHelpInline checkbox
    Then "First" field help is not set to fieldHelpInline and has margin-left set to "32px"

  @positive
  Scenario Outline: Change RadioButton input width to <width>
    When I set RadioButton weekly inputWidth slider to <width>
    Then "First" RadioButton "weekly" inputWidth is set to <px>
    Examples:
      | width | px  |
      | 1     | 11  |
      | 10    | 106 |
      | 50    | 530 |

  @positive
  Scenario Outline: Change RadioButton label width to <width>
    When I check weekly fieldHelpInline checkbox
      And I set RadioButton weekly labelWidth slider to <width>
    Then "First" RadioButton label width is set to <px>
    Examples:
      | width | px   |
      | 1     | 11   |
      | 50    | 530  |
      | 100   | 1047 |

  @positive
  Scenario Outline: Change RadioButton label align to <direction>
    Given I set RadioButton weekly labelWidth slider to 10
    When I select weekly labelAlign to "<direction>"
    Then "First" label Align on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |