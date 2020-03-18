Feature: RadioButton validations component
  I want to change RadioButton validations component properties

  Background: Open RadioButton validations component page
    Given I open "Experimental RadioButton" component page validations in iframe

  @positive
  @validations
  Scenario Outline: Verify the <state> validation of RadioButton component
    When I click onto "<state>" radioButton for validations component in iFrame
      And I hover mouse onto "<state>" icon in iFrame
    Then tooltipPreview on preview into iFrame is set to "<text>"
      And icon name into iFrame on preview is "<state>"
    Examples:
      | state   | text                    |
      | error   | An error has occurred!  |
      | warning | Watch out!              |
      | info    | Let me tell you this... |