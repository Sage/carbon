Feature: Validations basic component
  I want to change Validations basic component properties

  Background: Open Validations basic component page
    Given I open "Validations" component page basic in iframe

  @positive
  @validations
  Scenario Outline: Verify the error validation of Validations basic component
    Given I click onto "<position>" input for validations component into iFrame
      And I click above of the component into iFrame
    When I hover mouse onto "error" icon in iFrame
    Then tooltipPreview on preview into iFrame is set to "<text>"
      And icon name into iFrame on preview is "error"
    Examples:
      | position | text                    |
      | first    | This field is required! |
      | fifth    | This field is required. |
      | sixth    | This field is required! |

  @positive
  @validations
  Scenario Outline: Verify the <state> validation of Validations basic component
    Given I click onto "<position>" input for validations component into iFrame
      And I click above of the component into iFrame
    When I hover mouse onto "<state>" icon in iFrame
    Then tooltipPreview on preview into iFrame is set to '<text>'
      And icon name into iFrame on preview is "<state>"
    Examples:
      | position | state   | text                                        |
      | third    | info    | You must select "Blue"!                     |
      | fourth   | warning | This value must include the word "warning"! |

  @positive
  @validations
  Scenario: Verify the error async validator input of Validations basic component
    Given I click onto "second" input for validations component into iFrame
      And I click above of the component into iFrame
      And I wait on async "error" icon
    When I hover mouse onto "error" icon in iFrame
    Then tooltipPreview on preview into iFrame is set to 'This value must include the word "valid"!'
      And icon name into iFrame on preview is "error"