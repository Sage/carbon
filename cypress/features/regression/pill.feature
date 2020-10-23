Feature: Pill component
  I want to test Pill component properties

  @positive
  Scenario Outline: Change Pill children to <children>
    When I open basic "Design System Pill Test" component in noIFrame with "pill" json from "commonComponents" using "<nameOfObject>" object name
    Then Pill children on preview is set to <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario Outline: Disable fill checkbox for a Pill component
    When I open basic "Design System Pill Test" component in noIFrame with "pill" json from "commonComponents" using "fillFalse" object name
    Then Pill component has no backgroundColor "<color>"
      And Pill borderColor has "<color>" color
    Examples:
      | color           |
      | rgb(0, 129, 93) |

  @positive
  Scenario: Enable fill checkbox for a Pill component
    When I open basic "Design System Pill Test" component in noIFrame with "pill" json from "commonComponents" using "fill" object name
    Then Pill component has "rgb(0, 129, 93)" fill color

  @positive
  Scenario: Disable onDelete checkbox for a Pill component
    When I open basic "Design System Pill Test" component in noIFrame with "pill" json from "commonComponents" using "onDeleteFalse" object name
    Then Pill component has no onDelete property

  @positive
  Scenario: Enable onDelete checkbox for a Pill component
    When I open basic "Design System Pill Test" component in noIFrame with "pill" json from "commonComponents" using "onDelete" object name
    Then Pill component has onDelete property

  @positive
  Scenario Outline: Set Pill size to <size>
    When I open basic "Design System Pill Test" component in noIFrame with "pill" json from "commonComponents" using "<nameOfObject>" object name
    Then Pill height is "<height>"
    Examples:
      | size | height | nameOfObject |
      | S    | 16     | sizeS        |
      | M    | 20     | sizeM        |
      | L    | 24     | sizeL        |
      | XL   | 26     | sizeXL       |

  @positive
  Scenario Outline: Verify the colorVariant color for status pillRole
    When I open basic "Design System Pill Test" component in noIFrame with "pill" json from "commonComponents" using "<nameOfObject>" object name
    Then Pill borderColor has "<color>" color
    Examples:
      | colorVariant | color             | nameOfObject         |
      | neutral      | rgb(77, 112, 128) | colorVariantNeutral  |
      | negative     | rgb(199, 56, 79)  | colorVariantNegative |
      | positive     | rgb(0, 99, 0)     | colorVariantPositive |
      | warning      | rgb(237, 131, 51) | colorVariantWarning  |

  @positive
  Scenario: Verify border outline color on focus
    Given I open basic "Design System Pill Test" component in noIFrame with "pill" json from "commonComponents" using "onDelete" object name
    When I focus Pill close icon
    Then Pill close icon has golden border outline
      And Pill close icon has "rgb(0, 96, 70)" backgroundColor

  @positive
  Scenario: Enable onDelete checkbox and check the delete event
    Given I open "Design System Pill Test" component page "basic"
      And I check onDelete checkbox
      And clear all actions in Actions Tab
    When I click cross icon in Iframe
    Then delete action was called in Actions Tab