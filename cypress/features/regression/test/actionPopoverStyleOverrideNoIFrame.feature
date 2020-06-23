Feature: Style overriden Action Popover component
  I want to verify overriden styles for Action Popover component

  Background: Style overriden Action Popover component
    Given I open style override Test "Action Popover" component page in noIframe

  @positive
  Scenario: Overriden button opens Action Popover
    When I click the menu button element in noiFrame
    Then Action Popover element is visible