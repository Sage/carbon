Feature: Validations textbox based classic component
  I want to change Validations textbox based classic component properties

  Background: Open Validations textbox based classic component page
    Given I open "Validations" textbox based classic component page in iframe

  @positive
  @validations
  Scenario Outline: Verify the error validation of Validations textbox based classic component
    When I click "Trigger Errors" button into iFrame
      And I hover mouse onto "<position>" "error" icon for validations component into iFrame
    Then tooltipPreview on preview into iFrame is set to '<text>'
      And icon name into iFrame on preview is "error"
    Examples:
      | text                                | position |
      | The number must be greater than 11! | first    |
      | The number must be greater than 11! | second   |
      | Incomplete field!                   | third    |

  @positive
  @validations
  Scenario Outline: Verify the warning validation of Validations textbox based classi component
    When I click "Trigger Warnings" button into iFrame
      And I hover mouse onto "<position>" "warning" icon for validations component into iFrame
    Then tooltipPreview on preview into iFrame is set to '<text>'
      And icon name into iFrame on preview is "warning"
    Examples:
      | text                     | position |
      | The number cannot be 12! | first    |
      | The number cannot be 12! | second   |
      | Must not include "ab"!   | third    |

  @positive
  @validations
  Scenario Outline: Verify the info validation of Validations textbox based classi component
    When I click "Trigger Info" button into iFrame
      And I hover mouse onto "<position>" "info" icon for validations component into iFrame
    Then tooltipPreview on preview into iFrame is set to '<text>'
      And icon name into iFrame on preview is "info"
    Examples:
      | text                                      | position |
      | Number "13" is not recommended            | first    |
      | Number "13" is not recommended            | second   |
      | Usage of "%" character is not recommended | third    |