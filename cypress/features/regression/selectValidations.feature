Feature: Select validations component
  I want to change Select validations component properties

  Background: Open Select validations component page
    Given I open "Experimental Select" component page validations

  @positive
  Scenario Outline: Verify the <state> validation of Select component
    Given Type "<keyWord>" text into input and select the value
      And I click outside of the component
    When I hover mouse onto icon
    Then tooltipPreview on preview is set to '<text>'
      And icon on preview is "<state>"
      Examples:
      | state    | keyWord | text                                 |
      | info     | Brown   | You have selected "Brown"            |
      | warning  | Blue    | Selecting "Blue" is not recommended  |
      | error    | Black   | "Black" cannot be selected!          |