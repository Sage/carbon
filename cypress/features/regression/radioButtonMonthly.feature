Feature: Experimental RadioButton monthly component
  I want to change Experimental RadioButton monthly component properties

  Background: Open Experimental RadioButton monthly component page
    Given I open "Experimental RadioButton" component page
      And "monthly" tab in "second" tab list is visible
      And I open monthly tab

  @positive
  Scenario Outline: Change RadioButton component monthly label to <label>
    When I set group monthly label to "<label>"
    Then "second" radioButton on preview is "<label>"
    Examples:
      | label                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Change RadioButton component monthly help label to <labelHelp>
    When I set group monthly labelHelp to "<labelHelp>"
      And I hover mouse onto "second" help icon
    Then tooltipPreview on preview is set to "<labelHelp>"
    Examples:
      | labelHelp               |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |


  @positive
  Scenario Outline: Change RadioButton component monthly value to <monthlyValue>
    When I set group monthly value to "<monthlyValue>"
    Then "monthly" RadioButton has value "<monthlyValue>"
    Examples:
      | monthlyValue            |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario: Disable RadioButton
    When I check group monthly disabled checkbox
    Then "monthly" RadioButton component is disabled

  @positive
  Scenario: Disable and enable RadioButton
    Given I check group monthly disabled checkbox
    When I uncheck group monthly disabled checkbox
    Then "monthly" RadioButton component is enabled

  @positive
  Scenario: Enable reverse RadioButton
    When I check group monthly reverse checkbox
    Then "monthly" RadioButton is set to reverse

  @positive
  Scenario: Enable and disable reverse RadioButton
    Given I check group monthly reverse checkbox
    When I uncheck group monthly reverse checkbox
    Then "monthly" RadioButton is not set to reverse

  @positive
  Scenario Outline: Change RadioButton size to <size>
    When I select group monthly size to "<size>"
    Then "monthly" RadioButton size on preview is set to "<size>"
    Examples:
      | size  |
      | small |
      | large |

  @positive
  Scenario Outline: Change RadioButton component field help to <fieldHelp>
    When I set group monthly fieldHelp to "<fieldHelp>"
    Then "second" fieldHelp on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp               |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario: Enable fieldHelpInline
    When I check group monthly fieldHelpInline checkbox
    Then "monthly radio button" field help is set to fieldHelpInline and has margin-left set to "0px" and has margin-right "6px"

  @positive
  Scenario: Enable and disable fieldHelpInline
    Given I check group monthly fieldHelpInline checkbox
      And "monthly radio button" field help is set to fieldHelpInline and has margin-left set to "0px" and has margin-right "6px"
    When I uncheck group monthly fieldHelpInline checkbox
    Then "monthly radio button" field help is not set to fieldHelpInline and has margin-left set to "32px"

  # pixels are adjusted for Travis build. For normal cypress test runner test should fail
  @positive
  Scenario Outline: Change RadioButton inputWidth to <width>
    When I set group monthly inputWidth slider to <width>
    Then "second" RadioButton "monthly" inputWidth is set to "<px>"
    Examples:
      | width | px         |
      | 1     | 16         |
      | 50    | 358.234375 |

  # pixels are adjusted for Travis build. For normal cypress test runner test should fail
  @positive
  Scenario Outline: Change RadioButton label width to <width>
    When I check group monthly fieldHelpInline checkbox
      And I set group monthly labelWidth slider to <width>
    Then "monthly" RadioButton label width is set to "<px>"
    Examples:
      | width | px        |
      | 1     | 10.609375 |
      | 100   | 847.78125 |

  @positive
  Scenario Outline: Change RadioButton labelAlign to <direction>
    When I select group monthly labelAlign to "<direction>"
    Then "second" label Align on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |