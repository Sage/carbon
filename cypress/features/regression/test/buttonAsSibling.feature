Feature: Button as a sibling component
  I want to test Button as a sibling component properties

  @positive
  Scenario Outline: Set Button as a sibling size to <size>
    When I open Test test_button_as_sibling "Button" component in noIFrame with "buttonAsSibling" json from "test" using "<nameOfObject>" object name
    Then Button as a sibling height is <height>
    Examples:
      | size   | height | nameOfObject |
      | small  | 32     | sizeSmall    |
      | medium | 40     | sizeMedium   |
      | large  | 48     | sizeLarge    |

  @positive
  Scenario Outline: Set Button subtext to <subtext>
    When I open Test test_button_as_sibling "Button" component in noIFrame with "buttonAsSibling" json from "test" using "<nameOfObject>" object name
    Then Button as a sibling subtext on preview is <subtext>
    Examples:
      | subtext                      | nameOfObject            |
      | mp150ú¿¡üßä                  | subtextOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | subtextSpecialCharacter |

  @positive
  Scenario Outline: Set Button as a sibling Type as <buttonType>
    When I open Test test_button_as_sibling "Button" component in noIFrame with "buttonAsSibling" json from "test" using "<nameOfObject>" object name
    Then Button font color is "<font-color>"
      And Button as a sibling background color is "<background>"
    Examples:
      | buttonType     | font-color         | background         | nameOfObject             |
      | primary        | rgb(255, 255, 255) | rgb(0, 129, 93)    | buttonTypePrimary        |
      | secondary      | rgb(0, 129, 93)    | rgba(0, 0, 0, 0)   | buttonTypeSecondary      |
      | tertiary       | rgb(0, 129, 93)    | rgba(0, 0, 0, 0)   | buttonTypeTertiary       |
      | darkBackground | rgb(0, 129, 93)    | rgb(255, 255, 255) | buttonTypeDarkBackground |

  @positive
  Scenario Outline: Set Button as a sibling component label to <label>
    When I open Test test_button_as_sibling "Button" component in noIFrame with "buttonAsSibling" json from "test" using "<nameOfObject>" object name
    Then Button as a sibling label on preview is <label>
    Examples:
      | label                        | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario: Disable Button as a sibling
    When I open Test test_button_as_sibling "Button" component in noIFrame with "buttonAsSibling" json from "test" using "disabled" object name
    Then Button as a sibling is disabled

  @positive
  Scenario: Enable Button as a sibling
    When I open Test test_button_as_sibling "Button" component in noIFrame with "buttonAsSibling" json from "test" using "disabledFalse" object name
    Then Button as a sibling is enabled

  @positive
  Scenario Outline: Change Button icon position to <iconPosition>
    When I open Test test_button_as_sibling "Button" component in noIFrame with "buttonAsSibling" json from "test" using "<nameOfObject>" object name
    Then Button as a sibling icon position is set to "<iconPosition>"
    Examples:
      | iconPosition | nameOfObject       |
      | after        | iconPositionAfter  |
      | before       | iconPositionBefore |

  @positive
  Scenario: Verify the click function for a Button component
    Given I open "Design System Button Test" component page "as a sibling"
      And clear all actions in Actions Tab
    When I click on "button" as a sibling
    Then click action was called in Actions Tab

  @positive
  Scenario: Set Button icon to alert
    Given I open "Design System Button Test" component page "as a sibling"
      And I check has icon checkbox
    When I select iconType to "alert"
    Then Button as a sibling icon is set to "alert"