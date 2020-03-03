Feature: Experimental RadioButton yearly component
  I want to change Experimental RadioButton yearly component properties

  Background: Open Experimental RadioButton yearly component page
    Given I open "Experimental RadioButton" component page
      And "yearly" tab in "second" tab list is visible
      And I open yearly tab

  @positive
  Scenario Outline: Change RadioButton component yearly label to <label>
    When I set group yearly label to "<label>"
    Then "Third" radioButton on preview is "<label>"
    Examples:
      | label                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Change RadioButton component yearly help label to <labelHelp>
    When I set group yearly labelHelp to "<labelHelp>"
      And I hover mouse onto "third" help icon
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
  Scenario Outline: Change RadioButton component yearly value to <yearlyValue>
    When I set group yearly value to "<yearlyValue>"
    Then "yearly" RadioButton has value "<yearlyValue>"
    Examples:
      | yearlyValue             |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario: Disable RadioButton
    When I check group yearly disabled checkbox
    Then "yearly" RadioButton component is disabled

  @positive
  Scenario: Disable and enable checkbox
    When I check group yearly disabled checkbox
      And I uncheck group yearly disabled checkbox
    Then "yearly" RadioButton component is enabled

  @positive
  Scenario: Enable reverse radio button
    When I check group yearly reverse checkbox
    Then "yearly" RadioButton is set to reverse

@positive
Scenario: Enable and disable reverse checkbox
  Given I check group yearly reverse checkbox
  When I uncheck group yearly reverse checkbox
  Then "yearly" RadioButton is not set to reverse

@positive
Scenario Outline: Change RadioButton size to <size>
  When I select group yearly size to "<size>"
  Then "yearly" RadioButton size on preview is set to "<size>"
  Examples:
    | size  |
    | small |
    | large |

@positive
Scenario Outline: Change RadioButton component field help to <fieldHelp>
  When I set group yearly fieldHelp to "<fieldHelp>"
  Then "Third" fieldHelp on preview is set to "<fieldHelp>"
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
  When I check group yearly fieldHelpInline checkbox
  Then "yearly radio button" field help is set to fieldHelpInline and has margin-left set to "0px" and has margin-right "6px"

@positive
Scenario: Enable and disable fieldHelpInline
  When I check group yearly fieldHelpInline checkbox
  Then "yearly radio button" field help is set to fieldHelpInline and has margin-left set to "0px" and has margin-right "6px"
    And I uncheck group yearly fieldHelpInline checkbox
  Then "yearly radio button" field help is not set to fieldHelpInline and has margin-left set to "32px"

# pixels are adjusted for Travis CI. For normal cypress test runner test should fail
@positive
Scenario Outline: Change RadioButton inputWidth to <width>
  When I set group yearly inputWidth slider to <width>
  Then "Third" RadioButton "yearly" inputWidth is set to "<px>"
  Examples:
    | width | px         |
    | 1     | 16         |
    | 10    | 98.71875   |
    | 50    | 358.234375 |

# pixels are adjusted for Travis CI. For normal cypress test runner test should fail
@positive
Scenario Outline: Change RadioButton label width to <width>
  When I check group yearly fieldHelpInline checkbox
    And I set group yearly labelWidth slider to <width>
  Then "yearly" RadioButton label width is set to "<px>"
  Examples:
    | width | px        |
    | 1     | 10.609375 |
    | 50    | 530.5     |
    | 100   | 847.78125 |

@positive
Scenario Outline: Change RadioButton label align to <direction>
  When I select group yearly labelAlign to "<direction>"
  Then "Third" label Align on preview is "<direction>"
  Examples:
    | direction |
    | left      |
    | right     |