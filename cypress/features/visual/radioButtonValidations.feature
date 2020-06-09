Feature: RadioButton validations component
  I want to check that all examples of RadioButton component - validation story render correctly

  @positive
  @applitools
  Scenario: Check that RadioButton component validation story renders correctly
    When I open "Experimental RadioButton" component page validations in noIframe
    Then Element displays correctly