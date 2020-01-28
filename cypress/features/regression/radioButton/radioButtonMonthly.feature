Feature: Experimental RadioButton monthly component
  I want to change Experimental RadioButton monthly component properties

  Background: Open Experimental RadioButton monthly component page
    Given I open "Experimental RadioButton" component page
      And "monthly" tab in "second" tab list is visible
      And I open monthly tab

  @positive
  Scenario Outline: Change RadioButton component monthly label to <label>
    When I set group monthly label to "<label>"
    Then "Second" radioButton on preview is "<label>"
    Examples:
      | label                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Change RadioButton component monthly help label to <labelHelp>
    When I set group monthly labelHelp to "<labelHelp>"
      And I hover mouse onto "second" help icon
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
  Scenario Outline: Change RadioButton component monthly value to <monthlyValue>
    When I set group monthly value to "<monthlyValue>"
    Then "Second" RadioButton has value "<monthlyValue>"
    Examples:
      | monthlyValue            |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario: Disable and enable checkbox
    When I check group monthly disabled checkbox
      And I uncheck group monthly disabled checkbox
    Then "Second" RadioButton component is enabled

  @positive
  Scenario: Enable reverse radioButton
    When I check group monthly reverse checkbox
    Then "Second" RadioButton is set to reverse

  @positive
  Scenario: Enable and disable reverse checkbox
    # Given I open monthly tab
    Then "Second" RadioButton is not set to reverse

  @positive
  Scenario Outline: Change RadioButton size to <size>
    When I select group monthly size to "<size>"
    Then "Second" RadioButton size on preview is set to "<size>"
    Examples:
      | size  |
      | small |
      | large |

  @positive
  Scenario Outline: Change RadioButton component field help to <fieldHelp>
    When I set group monthly fieldHelp to "<fieldHelp>"
    Then "Second" fieldHelp on preview is set to "<fieldHelp>"
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
    When I check group monthly fieldHelpInline checkbox
    Then "Second" field help is set to fieldHelpInline and has margin-left set to "32px" and has margin-right "0px"

  @positive
  Scenario: Enable and disable fieldHelpInline
    When I check group monthly fieldHelpInline checkbox
      And I uncheck group monthly fieldHelpInline checkbox
    Then "Second" field help is not set to fieldHelpInline and has margin-left set to "32px"

  @positive
  Scenario Outline: Change RadioButton input width to <width>
    When I set group monthly inputWidth slider to <width>
    Then "Second" RadioButton "monthly" inputWidth is set to <px>
    Examples:
      | width | px  |
      | 1     | 11  |
      | 10    | 106 |
      | 50    | 531 |

  @positive
  Scenario Outline: Change RadioButton label width to <width>
    When I check group monthly fieldHelpInline checkbox
      And I set group monthly labelWidth slider to <width>
    Then "Second" RadioButton label width is set to <px>
    Examples:
      | width | px   |
      | 1     | 11   |
      | 50    | 531  |
      | 100   | 1049 |

  @positive
  Scenario Outline: Change RadioButton label align to <direction>
    Given I set group monthly labelWidth slider to 10
    When I select group monthly labelAlign to "<direction>"
    Then "Second" label Align on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |
