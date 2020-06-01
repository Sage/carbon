Feature: Toast component
  I want to check that all examples of Toast component render correctly

  @positive
  @applitools
  Scenario: Check that Toast component renders correctly
    When I open visual Test "Toast" component page in noIframe
    Then Element displays correctly