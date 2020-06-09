Feature: Experimental RadioButtonGroup component
  I want to change Experimental RadioButtonGroup component properties

  Background: Open Experimental RadioButton other component page
    Given I open "Experimental RadioButton" component page
      And "Other" tab in "second" tab list is visible
      And I open Other tab

  @positive
  Scenario: RadioButton inline
    When I check inline checkbox
    Then RadioButton are inline

  @positive
  Scenario: RadioButton not inline
    When I check inline checkbox
      And I uncheck inline checkbox
    Then RadioButton are not inline

  @positive
  Scenario: LegendInline inline
    When I check legendInline checkbox
    Then legendInline is inline with RadioButton

  @positive
  Scenario: legendInline not inline
    When I check legendInline checkbox
      And I uncheck legendInline checkbox
    Then legendInline is not inline with RadioButton