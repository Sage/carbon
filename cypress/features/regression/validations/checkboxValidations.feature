Feature: Checkbox validations component
  I want to change Checkbox validations component properties

  Background: Open Checkbox validations component page
    Given I open "Experimental Checkbox" component page validations in iframe

  @positive
  @validations
  Scenario Outline: Verify the <state> validation of Checkbox in form component
    Given I check "<position>" checkbox 2 times
    When I hover mouse onto "<state>" icon in iFrame
    Then tooltipPreview on preview into iFrame is set to "<text>"
      And icon name into iFrame on preview is "<state>"
    Examples:
      | state   | position | text                       |
      | error   | first    | This checkbox is required! |
      | warning | second   | Show warning!              |

    @ignore
    # ignored regression
    Examples:
      | info    | third    | Show this information      |

  @ignore
  # ignored regression
  @validations
  Scenario: Verify the question validation of Checkbox in form component
    Given I check "fourth" checkbox 2 times
    When I hover mouse onto "fourth" "question" icon for validations component into iFrame
    Then tooltipPreview on preview into iFrame is set to "This text provides more information for the label."
      And icon name into iFrame on preview is "question"

  @positive
  @validations
  Scenario: Verify the warning validation of Checkbox in group component
    Given I check "sixth" checkbox
    When I hover mouse onto "warning" icon in iFrame
    Then tooltipPreview on preview into iFrame is set to "Show warning!"
      And icon name into iFrame on preview is "warning"

  @ignore
  # ignored regression
  @validations
  Scenario: Verify the info validation of Checkbox in group component
    Given I check "sixth" checkbox
      And I check "seventh" checkbox
    When I hover mouse onto "info" icon in iFrame
    Then tooltipPreview on preview into iFrame is set to "Show this information"
      And icon name into iFrame on preview is "info"

  @positive
  @validations
  Scenario: Verify the error validation of Checkbox in group component
    Given I check "sixth" checkbox 2 times
    When I hover mouse onto "error" icon in iFrame
    Then tooltipPreview on preview into iFrame is set to "This checkbox is required!"
      And icon name into iFrame on preview is "error"