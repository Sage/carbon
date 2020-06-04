Feature: Menu component
  I want to check that all examples of Menu component render correctly

  @positive
  @applitools
  Scenario: Check that Menu component visual story rendered correctly
    When I open visual Test "Menu" component page in noIframe
      And I invoke "second" expandable Menu component noIfame
      And I invoke "fourth" expandable Menu component noIfame
    Then Element displays correctly
