Feature: Checkbox validations component
  I want to test Checkbox validations component properties

  Background: Open Checkbox validations component page
    Given I open "Experimental Checkbox" component page validations in iframe

  @positive
  @validations
  Scenario Outline: Verify the <state> validation of Checkbox in form component
    Given I check "<position>" checkbox 2 times
    When I hover mouse onto "<state>" icon in no iFrame for checkbox
    Then tooltipPreview on preview into iFrame is set to "<text>"
      And "<position>" icon name in no iFrame on preview is "<state>"
    Examples:
      | state   | position | text                       |
      | error   | first    | This checkbox is required! |
      | warning | second   | Show warning!              |
      | info    | third    | Show this information      |

  @positive
  @validations
  Scenario: Verify the optional validation of Checkbox in form component
    Given I check "fourth" checkbox 2 times
    When I hover mouse onto "optional" icon in no iFrame for checkbox
    Then tooltipPreview on preview into iFrame is set to "This text provides more information for the label."
      And "fourth" icon name in no iFrame on preview is "info"

  @positive
  @validations
  Scenario: Verify the warning validation of Checkbox in group component
    Given I check "sixth" checkbox
    When I hover mouse onto first icon in no iFrame for checkbox group
    Then label icon for checkbox group on preview in no iFrame is set to "Show warning!"
      And icon name into iFrame on preview is "warning"

  @positive
  @validations
  Scenario: Verify the info validation of Checkbox in group component
    Given I check "sixth" checkbox
      And I check "seventh" checkbox
    When I hover mouse onto first icon in no iFrame for checkbox group
    Then label icon for checkbox group on preview in no iFrame is set to "Show this information"
      And icon name into iFrame on preview is "info"

  @positive
  @validations
  Scenario: Verify the error validation of Checkbox in group component
    Given I check "sixth" checkbox 2 times
    When I hover mouse onto first icon in no iFrame for checkbox group
    Then label icon for checkbox group on preview in no iFrame is set to "This checkbox is required!"
      And icon name into iFrame on preview is "error"