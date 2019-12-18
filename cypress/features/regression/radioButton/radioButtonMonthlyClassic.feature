Feature: Experimental RadioButton monthly classic component
  I want to change Experimental RadioButton monthly classic component properties

  Background: Open Experimental RadioButton monthly classic component page
    Given I open "Experimental RadioButton" component page classic
      And "monthly" tab in "second" tab list is visible
      And I open monthly tab

  @positive
  Scenario Outline: Change RadioButton component monthly label to <label>
    When I set "monthly" "label" to "<label>"
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
    When I set "monthly" "labelHelp" to "<labelHelp>"
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
    When I set "monthly" "value" to "<monthlyValue>"
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
  Scenario: Disable RadioButton
    When I check monthly disabled checkbox
    Then "Second" RadioButton component is disabled

  @positive
  Scenario: Disable and enable checkbox
    When I check monthly disabled checkbox
      And I uncheck monthly disabled checkbox
    Then "Second" RadioButton component is enabled

  @positive
  Scenario: Enable reverse radioButton
    When I check monthly reverse checkbox
    Then "Second" RadioButton is set to reverse

  @positive
  Scenario: Enable and disable reverse checkbox
    # Given I open monthly tab
    Then "Second" RadioButton is not set to reverse

  @positive
  Scenario Outline: Change RadioButton component field help to <fieldHelp>
    When I set "monthly" "fieldHelp" to "<fieldHelp>"
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
    When I check monthly fieldHelpInline checkbox
    Then "Second" field help is set to fieldHelpInline and has margin-left set to "22px" and has margin-right "6px"

  @positive
  Scenario: Enable and disable fieldHelpInline
    When I check monthly fieldHelpInline checkbox
      And I uncheck monthly fieldHelpInline checkbox
    Then "Second" field help is not set to fieldHelpInline and has margin-left set to "22px"

  @positive
  Scenario Outline: Change RadioButton input width to <width>
    When I set RadioButton monthly inputWidth slider to <width>
    Then "Second" RadioButton "monthly" inputWidth is set to <px>
    Examples:
      | width | px  |
      | 1     | 11  |
      | 10    | 106 |
      | 50    | 530 |

  @positive
  Scenario Outline: Change RadioButton label width to <width>
    When I check monthly fieldHelpInline checkbox
      And I set RadioButton monthly labelWidth slider to <width>
    Then "Second" RadioButton label width is set to <px>
    Examples:
      | width | px   |
      | 1     | 11   |
      | 50    | 530  |
      | 100   | 1047 |

  @positive
  Scenario Outline: Change RadioButton label align to <direction>
    Given I set RadioButton monthly labelWidth slider to 10
    When I select monthly labelAlign to "<direction>"
    Then "Second" label Align on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |