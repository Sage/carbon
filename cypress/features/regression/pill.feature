Feature: Pill component
  I want to test Pill component properties

  @positive
  Scenario Outline: Change Pill children to <children>
    When I open default "Design System Pill Test" component in noIFrame with "pill" json from "commonComponents" using "<nameOfObject>" object name
    Then Pill children on preview is set to <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario: Verify border outline color on focus
    Given I open default "Design System Pill Test" component in noIFrame with "pill" json from "commonComponents" using "onDelete" object name
    When I focus Pill close icon
    Then Pill close icon has golden border outline
      And Pill close icon has "rgb(0, 96, 70)" backgroundColor

  @positive
  Scenario: Enable onDelete checkbox and check the delete event
    Given I open "Design System Pill Test" component page "default"
      And I check onDelete checkbox
      And clear all actions in Actions Tab
    When I click cross icon in Iframe
    Then delete action was called in Actions Tab