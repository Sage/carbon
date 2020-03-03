Feature: Experimental RadioButton weekly component
  I want to change Experimental RadioButton weekly component properties

  Background: Open Experimental RadioButton weekly component page
    Given I open "Experimental RadioButton" component page
      And "weekly" tab in "second" tab list is visible
      And I open weekly tab

  @positive
  Scenario Outline: Change RadioButton component weekly label to <label>
    When I set group weekly label to "<label>"
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
    When I set group weekly labelHelp to "<labelHelp>"
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
    When I set group weekly value to "<weeklyValue>"
    Then "weekly" RadioButton has value "<weeklyValue>"
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
    When I check group weekly disabled checkbox
    Then "weekly" RadioButton component is disabled

  @positive
  Scenario: Disable and enable checkbox
    When I check group weekly disabled checkbox
      And I uncheck group weekly disabled checkbox
    Then "weekly" RadioButton component is enabled

  @positive
  Scenario: Enable reverse radio button
    When I check group weekly reverse checkbox
    Then "weekly" RadioButton is set to reverse

  @positive
  Scenario: Enable and disable reverse checkbox
    Given I check group weekly reverse checkbox
    When I uncheck group weekly reverse checkbox
    Then "weekly" RadioButton is not set to reverse

  @positive
  Scenario Outline: Change RadioButton size to <size>
    When I select group weekly size to "<size>"
    Then "weekly" RadioButton size on preview is set to "<size>"
    Examples:
      | size  |
      | small |
      | large |

  @positive
  Scenario Outline: Change RadioButton component field help to <fieldHelp>
    When I set group weekly fieldHelp to "<fieldHelp>"
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
    When I check group weekly fieldHelpInline checkbox
    Then "weekly" field help is set to fieldHelpInline and has margin-left set to "32px" and has margin-right "0px"

  @positive
  Scenario: Enable and disable fieldHelpInline
    When I check group weekly fieldHelpInline checkbox
      Then "weekly radio button" field help is set to fieldHelpInline and has margin-left set to "0px" and has margin-right "6px"
      And I uncheck group weekly fieldHelpInline checkbox
    Then "weekly radio button" field help is not set to fieldHelpInline and has margin-left set to "32px"

  # pixels are adjusted for Travis CI. For normal cypress test runner test should fail
  @positive
  Scenario Outline: Change RadioButton inputWidth to <width>
    When I set group weekly inputWidth slider to <width>
    Then "First" RadioButton "weekly" inputWidth is set to "<px>"
    Examples:
      | width | px         |
      | 1     | 16         |
      | 10    | 98.71875   |
      | 50    | 358.234375 |

  # pixels are adjusted for Travis CI. For normal cypress test runner test should fail
  @positive
  Scenario Outline: Change RadioButton label width to <width>
    When I check group weekly fieldHelpInline checkbox
      And I set group weekly labelWidth slider to <width>
    Then "weekly" RadioButton label width is set to "<px>"
    Examples:
      | width | px        |
      | 1     | 10.609375 |
      | 50    | 530.5     |
      | 100   | 847.78125 |

  @positive
  Scenario Outline: Change RadioButton label align to <direction>
    When I select group weekly labelAlign to "<direction>"
    Then "First" label Align on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |