Feature: Switch validations component
  I want to check that all examples of Switch component - validation story render correctly

  @positive
  @applitools
  Scenario: Check that Switch component validation story renders correctly
    When I open "Experimental Switch" component page validations in noIframe
    Then Element displays correctly