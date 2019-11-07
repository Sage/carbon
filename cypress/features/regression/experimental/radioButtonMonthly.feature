Feature: Experimental RadioButton component
  I want to change Experimental RadioButton component properties

  Background: Open Experimental RadioButton component page
    Given I open "Experimental RadioButton" component page
      And I open monthly tab
  @ignore
  @positive
  Scenario Outline: Change RadioButton component monthly label to <label>
    # Given I open monthly tab
    When I set monthly label to "<label>"
    Then "Second" radioButton on preview is "<label>"
    Examples:
      | label                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |
  @ignore
  @positive
  Scenario Outline: Change RadioButton component monthly help label to <labelHelp>
      # Given I open monthly tab
      And I set monthly labelHelp to "<labelHelp>"
    When I hover mouse onto "second" help icon
    Then tooltipPreview on preview is set to "<labelHelp>"
    Examples:
      | labelHelp               |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |
  @ignore
  @positive
  Scenario: Change RadioButton component monthly value to monthly
    # Given I open monthly tab
    When I set monthly value to "monthly"
    Then "Second" RadioButton has value "monthly"
  @ignore
  @positive
  Scenario: Disable RadioButton
    # Given I open monthly tab
    When I check monthly disabled checkbox
    Then "Second" RadioButton component is disabled

  # dokonczyc
  @ignore
  @positive
  Scenario: Enable reverse radioButton
    When I check monthly reverse checkbox
    Then "Second" RadioButton is set to reverse
  @ignore
  @positive
  Scenario Outline: Change RadioButton size to <size>
    When I select monthly size to "<size>"
    Then "Second" RadioButton size on preview is set to "<size>"
    Examples:
      | size  |
      | small |
      | large |
@ignore
  @positive
  Scenario Outline: Change RadioButton component field help to <fieldHelp>
    When I set monthly fieldHelp to "<fieldHelp>"
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
    Then "Second" field help is set to fieldHelpInline
@ignore
  @positive
  Scenario: Enable and disable fieldHelpInline
    When I check monthly fieldHelpInline checkbox
      And I uncheck fieldHelpInline checkbox
    Then Checkbox is not set to fieldHelpInline and has margin set to "0px 0px 0px 16px"