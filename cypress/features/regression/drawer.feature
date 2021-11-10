Feature: Drawer component
  I want to test Drawer component

  @positive
  Scenario Outline: Verify chevron orientation when is clicked once for <drawer> Drawer
    Given I open "Drawer" component page "<drawer>"
    When I click on <drawerID> Drawers arrow 1 time
    Then Drawers <drawerID> sidebar should have class <class>
      And toggle <drawerID> Drawers icon switched orientation to <class>
      And Drawer <drawerID> sidebar text is <visibility>
    Examples:
      | drawer        | drawerID          | class  | visibility  |
      | controlled    | controlled-drawer | open   | visible     |
      | with controls | with-controls     | closed | not visible |

  @positive
  Scenario Outline: Verify chevron orientation when is clicked twice for <drawer> Drawer
    Given I open "Drawer" component page "<drawer>"
    When I click on <drawerID> Drawers arrow 2 times
    Then Drawers <drawerID> sidebar should have class <class>
      And toggle <drawerID> Drawers icon switched orientation to <class>
      And Drawer <drawerID> sidebar text is <visibility>
    Examples:
      | drawer        | drawerID          | class  | visibility  |
      | with controls | with-controls     | open   | visible     |
      | controlled    | controlled-drawer | closed | not visible |

  @positive
  Scenario: Confirm that animationDuration is set to 3 seconds
    Given I open "Drawer" component page "different animation speed"
    When I click on three-second-animation-drawer Drawers arrow 1 time
    Then Drawer three-second-animation-drawer animationDuration is set to "3s"