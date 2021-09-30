Feature: Link Preview component
  I want to test Link Preview component

  @positive
  Scenario: Verify hover color of Link Preview component
    Given I open "Link Preview" component page "default story"
    When I hover mouse onto Link Preview component
    Then Link Preview text element has correct background-color "rgb(204, 214, 219)"

  @positive
  Scenario: Verify border outline color and width of Link Preview on focus
    Given I open "Link Preview" component page "default story"
    When I focus Link Preview component
    Then Link Preview has the border outline color "rgb(255, 181, 0)" and width "2px"

  @positive
  Scenario: Verify border outline color and width of close icon on focus
    Given I open "Link Preview" component page "with close icon"
    When I focus Link Preview close icon
    Then Link Preview close icon has the border outline color "rgb(255, 181, 0)" and width "3px"  

  @positive
  Scenario: Check the delete event using the mouse
    Given I open "Link Preview Test" component page "default"
    When I click Link Preview close icon
    Then "close icon clicked: \"https://www.sage.com\"" action is called in Actions Tab for Link Preview

  @positive
  Scenario Outline: Check the delete event using <key> key
    Given I open "Link Preview Test" component page "default"
      And I focus Link Preview close icon 
    When I click onto Link Preview close icon using "<key>" key
    Then "close icon clicked: \"https://www.sage.com\"" action is called in Actions Tab for Link Preview
     Examples:
      | key   |
      | Enter |
      | Space |