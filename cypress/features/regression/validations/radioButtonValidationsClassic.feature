Feature: RadioButton validations classic component
  I want to change RadioButton validations classic component properties

  Background: Open RadioButton validations classic component page
    Given I open "Experimental RadioButton" component page validations classic in iframe

  @positive
  @validations
  Scenario Outline: Verify the <state> validation classic of RadioButton component
    When I click onto "<position>" radioButton for validations component into iFrame
      And I hover mouse onto "<state>" icon in iFrame
    Then tooltipPreview on preview into iFrame is set to "<text>"
      And icon name into iFrame on preview is "<state>"
    Examples:
      | state   | position | text                    |
      | error   | first    | An error has occurred!  |
      | warning | second   | Watch out!              |
      | info    | third    | Let me tell you this... |