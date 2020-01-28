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
    Then "Third" RadioButton has value "<yearlyValue>"
    Examples:
      | yearlyValue            |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario: Disable RadioButton
    When I check group yearly disabled checkbox
    Then "Third" RadioButton component is disabled

  @positive
  Scenario: Disable and enable checkbox
    When I check group yearly disabled checkbox
      And I uncheck group yearly disabled checkbox
    Then "Third" RadioButton component is enabled

  @positive
  Scenario: Enable reverse radioButton
    When I check group yearly reverse checkbox
    Then "Third" RadioButton is set to reverse

  @positive
  Scenario: Enable and disable reverse checkbox
    # Given I open yearly tab
    Then "Third" RadioButton is not set to reverse

  @positive
  Scenario Outline: Change RadioButton size to <size>
    When I select group yearly size to "<size>"
    Then "Third" RadioButton size on preview is set to "<size>"
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
    Then "Third" field help is set to fieldHelpInline and has margin-left set to "32px" and has margin-right "0px"

  @positive
  Scenario: Enable and disable fieldHelpInline
    When I check group yearly fieldHelpInline checkbox
      And I uncheck group yearly fieldHelpInline checkbox
    Then "Third" field help is not set to fieldHelpInline and has margin-left set to "32px"

  @positive
  Scenario Outline: Change RadioButton input width to <width>
    When I set group yearly inputWidth slider to <width>
    Then "Third" RadioButton "yearly" inputWidth is set to <px>
    Examples:
      | width | px  |
      | 1     | 11  |
      | 10    | 106 |
      | 50    | 531 |

  @positive
  Scenario Outline: Change RadioButton label width to <width>
    When I check group yearly fieldHelpInline checkbox
      And I set group yearly labelWidth slider to <width>
    Then "Third" RadioButton label width is set to <px>
    Examples:
      | width | px   |
      | 1     | 11   |
      | 50    | 531  |
      | 100   | 1049 |

  @positive
  Scenario Outline: Change RadioButton label align to <direction>
    Given I set group yearly labelWidth slider to 10
    When I select group yearly labelAlign to "<direction>"
    Then "Third" label Align on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |
