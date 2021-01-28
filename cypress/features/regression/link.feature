Feature: Link component
  I want to test Link component properties

  @positive
  Scenario Outline: Change Link target to <target>
    When I open Basic "Link Test" component in noIFrame with "link" json from "commonComponents" using "<nameOfObject>" object name
    Then Link on preview target is set to <target>
    Examples:
      | target | nameOfObject |
      | _blank | targetBlank  |
      | _self  | targetSelf   |
      | _top   | targetTop    |

  @positive
  Scenario Outline: Change Link children to <children>
    When I open Basic "Link Test" component in noIFrame with "link" json from "commonComponents" using "<nameOfObject>" object name
    Then children on preview is <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario: Link is tabbable
    When I open Basic "Link Test" component in noIFrame with "link" json from "commonComponents" using "tabbable" object name
    Then Link is tabbable

  @positive
  Scenario: Link is not tabbable
    When I open Basic "Link Test" component in noIFrame with "link" json from "commonComponents" using "tabbableFlase" object name
    Then Link is not tabbable

  @positive
  Scenario: Change type of icon for a Link component to feedback
    When I open Basic "Link Test" component in noIFrame with "link" json from "commonComponents" using "icon" object name
    Then icon on link component preview is "feedback"