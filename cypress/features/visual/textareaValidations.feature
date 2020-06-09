Feature: Textarea validations component
  I want to check that all examples of Textarea component - validation story render correctly

  @positive
  @applitools
  Scenario: Check that Textarea component validation story renders correctly
    When I open "Experimental Textarea" component page validations in noIframe
    Then Element displays correctly