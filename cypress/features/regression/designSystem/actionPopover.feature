Feature: Design System Action Popover component
  I want to test Action Popover component

  @positive
  Scenario: Invoking Action Popover component in a hidden container
    Given I open "Design System Action Popover" component page "in_overflow_hidden_container" in no iframe
      And I expand accordionRow using "Enter" key
    When I click the menu button element in noiFrame
    Then Action Popover element is visible