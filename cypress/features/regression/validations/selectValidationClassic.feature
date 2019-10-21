Feature: Select validations classic component
  I want to change Select validations classic component properties

  Background: Open Select validations classic component page
    Given I open "Experimental Select" component page validations classic

  @positive
  @validations
  Scenario Outline: Verify the <state> validation of Select component
    When Type "<keyWord>" text into input and select the value into iFrame
      And I click above of the component into iFrame
      And I hover mouse onto icon into iFrame
    Then tooltipPreview on preview into iFrame is set to '<text>'
      And icon name on preview is "<state>"
  Examples:
    | state    | keyWord | text                                 |
    | info     | Brown   | You have selected "Brown"            |
    | warning  | Blue    | Selecting "Blue" is not recommended  |
    | error    | Black   | "Black" cannot be selected!          |
