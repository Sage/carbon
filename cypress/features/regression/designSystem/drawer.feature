Feature: Drawer component
  I want to test Drawer component

  Background: Open Drawer component page
    Given I open Design Systems controlled "Drawer" component docs page

  @positive
  Scenario Outline: When chevron is clicked once on the <drawer> Drawer
    When I click on <drawer> Drawers arrow 1 time
    Then Drawers <drawer> sidebar should have class <class>
      And toggle <drawer> Drawers icon switched orientation to <class>
      And Drawer <drawer> sidebar text is <visibility>
    Examples:
    | drawer            | class  | visibility  |
    | controlled-drawer | open   | visible     |
    | with-controls     | closed | not visible |

  @positive
  Scenario Outline: When chevron is clicked twice on the <drawer> Drawer
    When I click on <drawer> Drawers arrow 2 times
    Then Drawers <drawer> sidebar should have class <class>
      And toggle <drawer> Drawers icon switched orientation to <class>
      And Drawer <drawer> sidebar text is <visibility>
  Examples:
    | drawer            | class  | visibility  |
    | with-controls     | open   | visible     |
    | controlled-drawer | closed | not visible |

  @positive
  Scenario: Confirm that animationDuration is set to 2 second
    When I click on two-second-animation-drawer Drawers arrow 1 time
    Then Drawer two-second-animation-drawer animationDuration is set to "2s"

  @positive
  Scenario: Confirm that animationDuration is set to 3 seconds
    When I click on three-second-animation-drawer Drawers arrow 1 time
    Then Drawer three-second-animation-drawer animationDuration is set to "3s"

  @positive
  Scenario: Set expandedWidth to 30%
    When I click on expanded-width-30-drawer Drawers arrow 1 time
    Then Drawer "expanded-width-30-drawer" expandedWidth is set to "287.390625px"

  @positive
  Scenario: Set expandedWidth to 62%
    When I click on expanded-width-62-drawer Drawers arrow 1 time
    Then Drawer "expanded-width-62-drawer" expandedWidth is set to "593.953125px"

  @positive
  Scenario: Drawer backgroundColor is set to yellow
    # commented because of BDD default scenario Given - When - Then
    # When I open "background-color-red-drawer" Drawer
    Then Drawer "controlled-drawer" backgroundColor is set to "rgb(255, 240, 0)"

  @positive
  Scenario: Drawer backgroundColor is set to red
    # commented because of BDD default scenario Given - When - Then
    # When I open "background-color-red-drawer" Drawer
    Then Drawer "background-color-red-drawer" backgroundColor is set to "rgb(255, 0, 0)"
