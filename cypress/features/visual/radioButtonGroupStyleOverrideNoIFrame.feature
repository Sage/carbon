Feature: Style overriden RadioButtonGroup component
  I want to check that overriden styles for RadioButtonGroup component - validation story render correctly

  @positive
  @applitools
  Scenario: Verify that RadioButtonGroup component overriden styles story renders properly
    When I open style override Test "RadioButtonGroup" component page in noIframe
    Then Element displays correctly