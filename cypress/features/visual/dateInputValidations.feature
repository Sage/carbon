Feature: Date Input validations component
  I want check that all examples of Date Input component - validation story render correctly

  @positive
  @applitools
  Scenario: Check that Date Input component validation story renders correctly
    When I open "Experimental Date Input" component page validations in noIframe
    Then Element displays correctly