Feature: Message component
  I want to test Message component default properties

  @positive
  Scenario: CloseIcon has correct border colour
    Given I open default "Message Test" component in noIFrame with "message" json from "commonComponents" using "default" object name
    When I focus closeIcon
    Then closeIcon has the border outline color "rgb(255, 181, 0)" and width "3px"

  @positive
  Scenario Outline: Change Message title to <title>
    When I open default "Message Test" component in noIFrame with "message" json from "commonComponents" using "<nameOfObject>" object name
    Then Message title on preview is set to <title>
    Examples:
      | title                        | nameOfObject          |
      | mp150ú¿¡üßä                  | titleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | titleSpecialCharacter |

  @positive
  Scenario: Enable transparent state for a Message component
    When I open default "Message Test" component in noIFrame with "message" json from "commonComponents" using "transparent" object name
    Then Message component is transparent

  @positive
  Scenario Outline: Change Message children to <children>
    When I open default "Message Test" component in noIFrame with "message" json from "commonComponents" using "<nameOfObject>" object name
    Then Message children on preview is set to <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario: Disable showCloseIcon for a Message component
    When I open default "Message Test" component in noIFrame with "message" json from "commonComponents" using "showCloseIconFalse" object name
    Then Message has no cross icon

  @positive
  Scenario: Verify the click function for a Message component
    Given I open "Message Test" component page "default"
      And clear all actions in Actions Tab
    When I click closeIcon in IFrame
    Then click action was called in Actions Tab