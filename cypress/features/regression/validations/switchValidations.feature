Feature: Switch validations component
  I want to change Switch validations component properties

  Background: Open Switch validations component page
    Given I open "Experimental Switch" component page validations in iframe

  @positive
  @validations
  Scenario Outline: Verify the <state> validation of Switch component
    When I toggle "<position>" switch 2 times
      And I hover mouse onto "<state>" icon in no iFrame
    Then tooltipPreview on preview into iFrame is set to "<text>"
      And icon name into iFrame on preview is "<state>"
    Examples:
      | state   | position | text          |
      | error   | first    | Show error!   |
      | warning | second   | Show warning! |
  
  @positive
  @validations
  Scenario: Verify the third info validation of Switch component
    When I toggle "third" switch 2 times
      And I hover mouse onto "third" "info" icon for validations component into iFrame
    Then tooltipPreview on preview into iFrame is set to "Show info!"
      And icon name into iFrame on preview is "info"

