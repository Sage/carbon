Feature: Link component
  I want to test Link component properties

  @positive
  Scenario Outline: Change Link target to <target>
    When I open default "Link Test" component with "link" json from "commonComponents" using "<nameOfObject>" object name
    Then Link on preview target is set to <target>
    Examples:
      | target | nameOfObject |
      | _blank | targetBlank  |
      | _self  | targetSelf   |
      | _top   | targetTop    |

  @positive
  Scenario Outline: Change Link children to <children>
    When I open default "Link Test" component with "link" json from "commonComponents" using "<nameOfObject>" object name
    Then children on preview is <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario: Link is tabbable
    When I open default "Link Test" component with "link" json from "commonComponents" using "tabbable" object name
    Then Link is tabbable

  @positive
  Scenario: Link is not tabbable
    When I open default "Link Test" component with "link" json from "commonComponents" using "tabbableFalse" object name
    Then Link is not tabbable

  @positive
  Scenario: Change type of icon for a Link component to feedback
    When I open default "Link Test" component with "link" json from "commonComponents" using "icon" object name
    Then icon on link component preview is "feedback"

  @positive
  Scenario: Check skip link is visible when focused
    Given I open "Link" component page "is skip link"
    When I hit Tab key 1 times
    Then Skip link is visible

  @positive
  Scenario: Check skip link is not visible without focus
    When I open "Link" component page "is skip link"
    Then Skip link is not visible

  @positive
  Scenario: Check rel attr is able to be used in a link component
    When I open "Link" component page "with rel"
    Then link has a rel attribute