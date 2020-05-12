Feature: Numeral Date component
  I want to test Numeral Date component properties

  Background: Open Numeral Date component page
    Given I open basic Test "Numeral Date" component page

  # will remove when Applitools will be implemented
  @positive
  Scenario: Number Date component has three separate inputs
    # commented because of BDD default scenario Given - When - Then
    # When I open basic Test "Numeral Date" component page
    Then Number Date component has 3 separate inputs

  # will remove when Applitools will be implemented
  @positive
  Scenario: Verify that Numeral Date input hasError border color
    When I check hasError checkbox
    Then Numeral Date inputs have "rgb(199, 56, 79)" border color

  # will remove when Applitools will be implemented
  @positive
  Scenario Outline: Verify that Numeral Date input <prop> border color
    Given I uncheck hasError checkbox
    When I check <prop> checkbox
    Then Numeral Date inputs have "<borderColor>" border color
    Examples:
      | prop       | borderColor      |
      | hasWarning | rgb(233, 100, 0) |
      | hasInfo    | rgb(0, 115, 194) |
      
  # will remove when Applitools will be implemented
  @positive
  Scenario: Verify the third Numeral Date input has error icon
    Given I check hasError checkbox
    When I select icon to "warning"
      And I select icon to "error"
    Then error icon is visible in third input

  @positive
  Scenario Outline: Verify the error message after hover on error icon
    Given I check hasError checkbox
      And I select icon to "warning"
      And I select icon to "error"
      And I set tooltipMessage to "<message>"
    When I hover mouse onto "error" icon in iFrame
    Then error message for Numeral Date input is "<message>"
    Examples:
      | message                 |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |