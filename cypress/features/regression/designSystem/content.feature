Feature: Content component
  I want to check Content component properties

  @positive
  Scenario Outline: Change children in Content dialog to <children>
    When I open default "Design System Content Test" component in noIFrame with "content" json from "designSystem" using "<nameOfObject>" object name
    Then content children on preview is <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario Outline: Change title in Content dialog to <title>
    When I open default "Design System Content Test" component in noIFrame with "content" json from "designSystem" using "<nameOfObject>" object name
    Then content title context children on preview is <title>
    Examples:
      | title                        | nameOfObject          |
      | mp150ú¿¡üßä                  | titleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | titleSpecialCharacter |

  @positive
  Scenario: BodyFullWidth disabled
    When I open default "Design System Content Test" component in noIFrame with "content" json from "designSystem" using "bodyFullWidthFalse" object name
    Then content preview has no bodyFullWidth parameter

  @positive
  Scenario Outline: Inline enabled and change title width to <width>
    When I open default "Design System Content Test" component in noIFrame with "content" json from "designSystem" using "<nameOfObject>" object name
    Then content preview has inline parameter enabled
      And content preview width is "<width>"
    Examples:
      | width      | nameOfObject  |
      | 0          | titleWidth0   |
      | 1336       | titleWidth100 |
      | 174.890625 | titleWidth15  |