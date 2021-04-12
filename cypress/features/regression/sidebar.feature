Feature: Sidebar component
  I want to test Sidebar component

  @positive
  Scenario: Enable enableBackgroundUI checkbox for a Sidebar component
    When I open default "Sidebar Test" component in noIFrame with "sidebar" json from "commonComponents" using "enableBackgroundUI" object name
    Then Sidebar component has enabled background UI

  @positive
  Scenario: Sidebar Pod position to left
    When I open default "Sidebar Test" component in noIFrame with "sidebar" json from "commonComponents" using "positionLeft" object name
    Then Sidebar position value is set to "left"

  @positive
  Scenario Outline: Set Sidebar size to <size>
    When I open default "Sidebar Test" component in noIFrame with "sidebar" json from "commonComponents" using "<nameOfObject>" object name
    Then Sidebar size value is set to "<sizePropertyInPx>"
    Examples:
      | size         | sizePropertyInPx | nameOfObject    |
      | extra-small  | 214              | sizeExtraSmall  |
      | small        | 314              | sizeSmall       |
      | medium-small | 414              | sizeMediumSmall |
      | medium       | 514              | sizeMedium      |
      | medium-large | 614              | sizeMediumLarge |
      | large        | 714              | sizeLarge       |
      | extra-large  | 814              | sizeExtraLarge  |

  @positive
  Scenario: Check the cancel click event
    Given I open "Sidebar Test" component page "default"
      And clear all actions in Actions Tab
    When I close Sidebar
    Then cancel action was called in Actions Tab