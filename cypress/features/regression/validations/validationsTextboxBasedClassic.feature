Feature: Validations textbox based classic component
  I want to change Validations textbox based classic component properties

  Background: Open Validations textbox based classic component page
    Given I open "Validations" textbox based classic component page in iframe

  @positive
  @validations
  Scenario Outline: Verify the error validation of Validations textbox based classic component
    Given I click "Trigger Errors" button into iFrame
    When I hover mouse onto "<position>" "error" icon for validations component into iFrame
    Then tooltipPreview on preview into iFrame is set to '<text>'
      And icon name into iFrame on preview is "error"
    Examples:
      |  position | text                                |
      |  first    | The number must be greater than 11! |
      |  second   | The number must be greater than 11! |
      |  third    | Incomplete field!                   |

  @positive
  @validations
  Scenario Outline: Verify the warning validation of Validations textbox based classi component
    Given I click "Trigger Warnings" button into iFrame
    When I hover mouse onto "<position>" "warning" icon for validations component into iFrame
    Then tooltipPreview on preview into iFrame is set to '<text>'
      And icon name into iFrame on preview is "warning"
    Examples:
      |  position | text                     |
      |  first    | The number cannot be 12! |
      |  second   | The number cannot be 12! |
      |  third    | Must not include "ab"!   |

  @positive
  @validations
  Scenario Outline: Verify the info validation of Validations textbox based classi component
    Given I click "Trigger Info" button into iFrame
    When I hover mouse onto "<position>" "info" icon for validations component into iFrame
    Then tooltipPreview on preview into iFrame is set to '<text>'
      And icon name into iFrame on preview is "info"
    Examples:
      |  position | text                                      |
      |  first    | Number "13" is not recommended            |
      |  second   | Number "13" is not recommended            |
      |  third    | Usage of "%" character is not recommended |