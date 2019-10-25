Feature: Validations basic classic component
  I want to change Validations basic classic component properties

  Background: Open Validations basic classic component page
    Given I open "Validations" basic classic component page in iframe
  @positive
  @validations
  Scenario Outline: Verify the error validation of Validations basic classic component
    When I click onto "<position>" input for validations component into iFrame
      And I click above of the component into iFrame
      And I hover mouse onto "error" icon into iFrame
    Then tooltipPreview on preview into iFrame is set to "<text>"
      And icon name into iFrame on preview is "error"
    Examples:
      | position | text                    |
      | first    | This field is required! |
      | fifth    | This field is required. |
      | sixth    | This field is required! |

  @positive
  @validations
  Scenario Outline: Verify the <state> validation of Validations basic classic component
    When I click onto "<position>" input for validations component into iFrame
      And I click above of the component into iFrame
      And I hover mouse onto "<state>" icon into iFrame
    Then tooltipPreview on preview into iFrame is set to '<text>'
      And icon name into iFrame on preview is "<state>"
    Examples:
      | position | state   | text                                        |
      | third    | info    | You must select "Blue"!                     |
      | fourth   | warning | This value must include the word "warning"! |

  @positive
  @validations
  Scenario Outline: Verify the "error" async validator input of Validations basic classic component
    When I click onto "<position>" input for validations component into iFrame
      And I click above of the component into iFrame
      And I wait on async "error" icon
      And I hover mouse onto "error" icon into iFrame
    Then tooltipPreview on preview into iFrame is set to '<text>'
      And icon name into iFrame on preview is "error"
    Examples:
      | position | text                                      |
      | second   | This value must include the word "valid"! |

  @positive
  @validations
  Scenario Outline: Verify the "error" deprecated Legacy Validation input of Validations basic classic component
    When I click onto "<position>" input for validations component into iFrame
      And I click above of the component into iFrame
      And I hover mouse onto validated input into iFrame
    Then Error message for deprecated input is "<text>"
    Examples:
      | position | text                    |
      | seventh  | This field is required. |