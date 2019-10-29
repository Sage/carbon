Feature: Select validations component
  I want to change Select validations component properties

  Background: Open Select validations component page
    Given I open "Experimental Select" component page validations in iframe

  @positive
  @validations
  Scenario Outline: Verify the <state> validation of Select component
    When Type "<keyWord>" text into input and select the value into iFrame
      And I click above of the component into iFrame
      And I hover mouse onto "<state>" icon in iFrame
    Then tooltipPreview on preview into iFrame is set to '<text>'
      And icon name into iFrame on preview is "<state>"
    Examples:
      | state   | keyWord | text                                |
      | info    | Brown   | You have selected "Brown"           |
      | warning | Blue    | Selecting "Blue" is not recommended |
      | error   | Black   | "Black" cannot be selected!         |