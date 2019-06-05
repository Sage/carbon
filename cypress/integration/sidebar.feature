Feature: Sidebar component
  I want to test Sidebar component

  Background: Open Sidebar component page
    Given I open "Sidebar" component page
      And I check open checkbox

  @positive
  Scenario: Enable open checkbox for a Sidebar component
    # When I check open checkbox
    Then Sidebar component is visible

  @positive
  Scenario: Enable and disable open checkbox for a Sidebar component
    When I uncheck open checkbox
    Then Sidebar component is not visible

  @positive
  Scenario: Enable enableBackgroundUI checkbox for a Sidebar component
    When I check enableBackgroundUI checkbox
    Then Sidebar component has enabled background UI

  @positive
  Scenario: Enable and disable enableBackgroundUI checkbox for a Sidebar component
    When I check enableBackgroundUI checkbox
      And I uncheck enableBackgroundUI checkbox
    Then Sidebar component has disabled background UI

  @positive
  Scenario Outline: Sidebar Pod position to <position>
    When I select position to "<position>"
    Then Sidebar position value is set to "<position>"
    Examples:
      | position |
      | left     |
      | right    |

  @positive
  Scenario Outline: Set Sidebar size to <size>
    When I select size to "<size>"
    Then Sidebar size value is set to "<sizePropertyInPx>"
    Examples:
      | size         | sizePropertyInPx |
      | extra-small  | 150              |
      | small        | 250              |
      | medium-small | 350              |
      | medium       | 450              |
      | medium-large | 550              |
      | large        | 650              |
      | extra-large  | 750              |

  @positive
  Scenario: Check the cancel click event
    When clear all actions in Actions Tab
      And I close Sidebar
    Then cancel action was called in Actions Tab