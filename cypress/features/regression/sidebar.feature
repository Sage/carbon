Feature: Sidebar component
  I want to test Sidebar component

  Background: Open Sidebar component page
    Given I open "Sidebar" component page
      And I check open checkbox

  @positive @applitools
  Scenario: CloseIcon has the border outline
    When closeIcon is focused
    Then closeIcon has the border outline color "rgb(255, 181, 0)" and width "3px"

  @positive @applitools
  Scenario: Check the cancel click event
    Given clear all actions in Actions Tab
    When I close Sidebar
    Then cancel action was called in Actions Tab

  @positive @applitools
  Scenario: Enable open checkbox for a Sidebar component
    # commented because of BDD default scenario Given - When - Then
    # When I check open checkbox
    Then Sidebar component is visible
      And Element displays correctly

  @positive @applitools
  Scenario: Enable and disable open checkbox for a Sidebar component
    When I uncheck open checkbox
    Then Sidebar component is not visible
      And Element displays correctly

  @positive @applitools
  Scenario: Enable enableBackgroundUI checkbox for a Sidebar component
    When I check enableBackgroundUI checkbox
    Then Sidebar component has enabled background UI
      And Element displays correctly

  @positive @applitools
  Scenario: Enable and disable enableBackgroundUI checkbox for a Sidebar component
    When I check enableBackgroundUI checkbox
      And I uncheck enableBackgroundUI checkbox
    Then Sidebar component has disabled background UI
      And Element displays correctly

  @positive @applitools
  Scenario Outline: Sidebar Pod position to <position>
    When I select position to "<position>"
    Then Sidebar position value is set to "<position>"
      And Element displays correctly
    Examples:
      | position |
      | left     |
      | right    |

  @positive @applitools
  Scenario Outline: Set Sidebar size to <size>
    When I select size to "<size>"
    Then Sidebar size value is set to "<sizePropertyInPx>"
      And Element displays correctly
    Examples:
      | size         | sizePropertyInPx |
      | extra-small  | 150              |
      | small        | 250              |
      | medium-small | 350              |
      | medium       | 450              |
      | medium-large | 550              |
      | large        | 650              |
      | extra-large  | 750              |

