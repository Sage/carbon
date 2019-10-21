Feature: Switch validations classic component
  I want to change Switch validations classic component properties

  Background: Open Switch validations classic component page
    Given I open "Experimental Switch" component page validations classic

  @positive
  @validations
  Scenario Outline: Verify the <state> validation of Switch component
    When I toggle onto <position> switch 2 times
      And I hover mouse onto "<state>" icon into iFrame
    Then tooltipPreview on preview into iFrame is set to "<text>"
      And icon name into iFrame on preview is "<state>"
    Examples:
      | state   | position | text          |
      | error   | 0        | Show error!   |
      | warning | 1        | Show warning! |
      | info    | 2        | Show info!    |
