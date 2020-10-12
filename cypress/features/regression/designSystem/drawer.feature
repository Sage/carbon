Feature: Drawer component
  I want to test Drawer component

  @positive
  Scenario Outline: Verify chevron orientation when is clicked once for <drawer> Drawer
    Given I open "Design System Drawer" component page "<drawer>" in no iframe
    When I click on <drawerID> Drawers arrow 1 time
    Then Drawers <drawerID> sidebar should have class <class>
      And toggle <drawerID> Drawers icon switched orientation to <class>
      And Drawer <drawerID> sidebar text is <visibility>
    Examples:
      | drawer        | drawerID          | class  | visibility  |
      | controlled    | controlled-drawer | open   | visible     |
      | with_controls | with-controls     | closed | not visible |

  @positive
  Scenario Outline: Verify chevron orientation when is clicked twice for <drawer> Drawer
    Given I open "Design System Drawer" component page "<drawer>" in no iframe
    When I click on <drawerID> Drawers arrow 2 times
    Then Drawers <drawerID> sidebar should have class <class>
      And toggle <drawerID> Drawers icon switched orientation to <class>
      And Drawer <drawerID> sidebar text is <visibility>
    Examples:
      | drawer        | drawerID          | class  | visibility  |
      | with-controls | with-controls     | open   | visible     |
      | controlled    | controlled-drawer | closed | not visible |

  @positive
  Scenario: Confirm that animationDuration is set to 2 second
    Given I open "Design System Drawer" component page "two_second_animation" in no iframe
    When I click on two-second-animation-drawer Drawers arrow 1 time
    Then Drawer two-second-animation-drawer animationDuration is set to "2s"

  @positive
  Scenario: Confirm that animationDuration is set to 3 seconds
    Given I open "Design System Drawer" component page "three_second_animation" in no iframe
    When I click on three-second-animation-drawer Drawers arrow 1 time
    Then Drawer three-second-animation-drawer animationDuration is set to "3s"