Feature: Textbox validations component
  I want to check that all examples of Textbox component - validation story render correctly

  @positive
  @applitools
  Scenario: Check that Textbox component validation story renders correctly
    When I open "Experimental Textbox" component page validations in noIframe
    Then Element displays correctly
