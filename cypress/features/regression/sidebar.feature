Feature: Sidebar component
  I want to test Sidebar component

  @positive
  Scenario: CloseIcon has the border outline
    When I open default "Sidebar Test" component in noIFrame with "sidebar" json from "commonComponents" using "default" object name
    Then closeIcon has the border outline color "rgb(255, 181, 0)" and width "3px"

  @positive
  Scenario: Enable open checkbox for a Sidebar component
    When I open default "Sidebar Test" component in noIFrame with "sidebar" json from "commonComponents" using "default" object name
    Then Sidebar component is visible

  @positive
  Scenario: Disable open checkbox for a Sidebar component
    When I open default "Sidebar Test" component in noIFrame with "sidebar" json from "commonComponents" using "openFalse" object name
    Then Sidebar component is not visible

  @positive
  Scenario: Enable enableBackgroundUI checkbox for a Sidebar component
    When I open default "Sidebar Test" component in noIFrame with "sidebar" json from "commonComponents" using "enableBackgroundUI" object name
    Then Sidebar component has enabled background UI

  @positive
  Scenario: Disable enableBackgroundUI checkbox for a Sidebar component
    When I open default "Sidebar Test" component in noIFrame with "sidebar" json from "commonComponents" using "enableBackgroundUIFalse" object name
    Then Sidebar component has disabled background UI

  @positive
  Scenario Outline: Sidebar Pod position to <position>
    When I open default "Sidebar Test" component in noIFrame with "sidebar" json from "commonComponents" using "<nameOfObject>" object name
    Then Sidebar position value is set to "<position>"
    Examples:
      | position | nameOfObject  |
      | left     | positionLeft  |
      | right    | positionRight |

  @positive
  Scenario Outline: Set Sidebar size to <size>
    When I open default "Sidebar Test" component in noIFrame with "sidebar" json from "commonComponents" using "<nameOfObject>" object name
    Then Sidebar size value is set to "<sizePropertyInPx>"
    Examples:
      | size         | sizePropertyInPx | nameOfObject    |
      | extra-small  | 150              | sizeExtraSmall  |
      | small        | 250              | sizeSmall       |
      | medium-small | 350              | sizeMediumSmall |
      | medium       | 450              | sizeMedium      |
      | medium-large | 550              | sizeMediumLarge |
      | large        | 650              | sizeLarge       |
      | extra-large  | 750              | sizeExtraLarge  |

  @positive
  Scenario: Check the cancel click event
    Given I open "Sidebar Test" component page "default"
      And clear all actions in Actions Tab
    When I close Sidebar
    Then cancel action was called in Actions Tab
