Feature: Textbox validations component
  I want to change Textbox validations component properties

  Background: Open Textbox validations component page
    Given I open "Experimental Textbox" component page validations in iframe

  @positive
  @validations
  Scenario Outline: Verify the <state> validation of Textbox component
    When Type "<state>" text into input into iFrame
      And I click above of the component into iFrame
      And I hover mouse onto "<state>" icon in iFrame
    Then tooltipPreview on preview into iFrame is set to '<text>'
      And icon name into iFrame on preview is "<state>"
    Examples:
      | state   | text                                            |
      | info    | This value should be longer than 12 characters  |
      | warning | This value must not include the word "warning"! |
      | error   | This value must not include the word "error"!   |
