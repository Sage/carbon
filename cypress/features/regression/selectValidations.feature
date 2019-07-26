Feature: Select validations component
  I want to change Select validations component properties

  Background: Open Select validations component page
    Given I open "Experimental Select" component page validations

  @positive
  Scenario: Verify the info validation of Select component
    Given Type "Brown" text into input and select the value
      And I click outside of the component
    When I hover mouse onto icon
    Then tooltipPreview on preview is set to 'You have selected "Brown"'
      And icon on preview is "info"
      

  @positive
  Scenario: Verify the warning validation of Select component
    Given Type "Blue" text into input and select the value
      And I click outside of the component
    When I hover mouse onto icon
    Then tooltipPreview on preview is set to 'Selecting "Blue" is not recommended'
      And icon on preview is "warning"

  @positive
  Scenario: Verify the error validation of Select component
    Given Type "Black" text into input and select the value
      And I click outside of the component
    When I hover mouse onto icon
    Then tooltipPreview on preview is set to '"Black" cannot be selected!'
      And icon on preview is "error"