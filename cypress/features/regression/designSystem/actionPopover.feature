Feature: Design System Action Popover component
  I want to test Action Popover component

  @positive
  Scenario: Invoking Action Popover component in a hidden container
    Given I open "Design System Action Popover" component page "in overflow hidden container" in no iframe
      And I expand accordionRow using "Enter" key
    When I click the menu button element in noiFrame
    Then Action Popover element is visible

  @positive
  Scenario: Check that actionPopoverInnerItem has download prop
    Given I open "Design System Action Popover" component page "with download button" in no iframe
    When I click the menu button element in noiFrame
    Then Download button has href link "example-img.jpg" and download prop