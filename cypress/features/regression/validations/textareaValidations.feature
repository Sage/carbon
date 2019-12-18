Feature: Textarea validations component
  I want to change Textarea validations component properties

  Background: Open Textarea validations component page
    Given I open "Experimental Textarea" component page validations in iframe

  @positive
  @validations
  Scenario Outline: Verify the <state> validation of Textarea component
    When Type "<state>" into Textarea into iFrame
      And I click above of the component into iFrame
      And I hover mouse onto "<state>" icon in iFrame
    Then tooltipPreview on preview into iFrame is set to '<text>'
      And icon name into iFrame on preview is "<state>"
    Examples:
      | state   | text                                            |
      | error   | This value must not include the word "error"!   |
      | warning | This value must not include the word "warning"! |
      | info    | Message should be longer than 12 characters     |