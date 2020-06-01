Feature: Drawer component
  I want to check that all examples of Drawer component render correctly

  @positive
  @applitools
  Scenario: Check that Drawer component visual story rendered correctly
    When I open visual Test "Drawer" component page in noIframe
    Then Element displays correctly