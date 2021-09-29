Feature: Action Popover component
  I want to test Action Popover component

  @positive
  Scenario: Invoking Action Popover component in a hidden container
    Given I open "Action Popover" component page "in overflow hidden container"
      And I expand accordionRow using "Enter" key
    When I click the menu button element
    Then Action Popover element is visible

  @positive
  Scenario: Check that actionPopoverInnerItem has download prop
    Given I open "Action Popover" component page "with download button"
    When I click the menu button element
    Then Download button has href link "example-img.jpg" and download prop

  @positive
  Scenario: Show Action Popover list is positioned below in large viewport
    Given I open "Action Popover" component page "in overflow hidden container"
      And I have a large viewport
      And I expand accordionRow using "Enter" key
    When I click the menu button element
    Then Action Popover element is visible in bottom position

  @positive
  Scenario: Show Action Popover list is positioned above in small viewport
    Given I open "Action Popover" component page "in overflow hidden container"
      And I have a small viewport
      And I expand accordionRow using "Enter" key
    When I click the menu button element
      And I scroll accordion content to top
    Then Action Popover element is visible in top position
