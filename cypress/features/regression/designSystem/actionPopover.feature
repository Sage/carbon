Feature: Design System Action Popover component
  I want to test Action Popover component

  @positive
  Scenario: Invoking Action Popover component in a hidden container
    Given I open "Design System Action Popover" component page "in overflow hidden container" in no iframe
      And I expand accordionRow using "Enter" key
    When I click the menu button element in noiFrame
    Then Action Popover element is visible

  @positive
  Scenario: Show Action Popover list is positioned below in large viewport
    Given I open "Design System Action Popover" component page "in overflow hidden container" in no iframe
      And I have a large viewport
      And I expand accordionRow using "Enter" key
    When I click the menu button element in noiFrame
    Then Action Popover element is visible in bottom position

  @positive
  Scenario: Show Action Popover list is positioned above in small viewport
    Given I open "Design System Action Popover" component page "in overflow hidden container" in no iframe
      And I have a small viewport
      And I expand accordionRow using "Enter" key
    When I click the menu button element in noiFrame
      And I scroll accordion content to top
    Then Action Popover element is visible in top position
