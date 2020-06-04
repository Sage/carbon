Feature: Checkbox validations component
  I want check that all examples of Checkbox component - validation story render correctly

  @positive
  @applitools
  Scenario: Check that Checkbox component validation story renders correctly
    When I open "Experimental Checkbox" component page validations in noIframe
    Then Element displays correctly