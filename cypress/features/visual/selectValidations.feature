Feature: Select validations component
  I want to check that all examples of Select component - validation story render correctly

  @positive
  @applitools
  Scenario: Check that Select component validation story renders correctly
    When I open "Experimental Select" component page validations in noIframe
    Then Element displays correctly