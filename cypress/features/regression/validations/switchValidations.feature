Feature: Switch validations component
  I want to change Switch validations component properties

  Background: Open Switch validations component page
    Given I open "Experimental Switch" component page validations in iframe

  @positive
  @validations
  Scenario Outline: Verify the <position> <state> validation of Switch component
    When I toggle "<position>" switch 2 times
      And I hover mouse onto "<state>" icon in iFrame
    Then tooltipPreview on preview into iFrame is set to "<text>"
      And icon name into iFrame on preview is "<state>"
    Examples:
      | state   | position | text          |
      | error   | first    | Show error!   |
      | warning | second   | Show warning! |
      | info    | third    | Show info!    |
