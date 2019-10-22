Feature: Validations textbox based validations component
  I want to change Validations textbox based component properties

  Background: Open Validations textbox based component page
    Given I open validations "Validations" component page in iframe

  @positive
  @validations
  Scenario Outline: Verify the error validation of Validations textbox based component
    When I click "Trigger Errors" button into iFrame
      And I hover mouse onto "error" icon into iFrame
    Then tooltipPreview on preview for validations component into iFrame is set to '<text>'
      And icon name into iFrame on preview is "<state>"

    Examples:
      | label                       | text                                      | position |
      | Decimal Component           | The number must be greater than 11!       |first|
      | Number Input Component      | The number must be greater than 11!       |second|
      | Grouped Character Component | Usage of "%" character is not recommended |third |