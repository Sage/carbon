Feature: Style overriden Action Popover component
  I want to verify overriden styles for Action Popover component

  Background: Style overriden Action Popover component
    Given I open style override Test "Action Popover" component page in noIframe

  @positive
  Scenario: Open style overriden Action Popover component page and verify overriden styles are rendered properly
    # When I open style override Test "Action Popover" component page in noIframe
    Then Action Popover overriden styles rendered properly

  @positive
  Scenario: Overriden button opens Action Popover
    When I click the menu button element in noiFrame
    Then Action Popover element is visible