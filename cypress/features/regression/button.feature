Feature: Button component
  I want to check Button component properties

  @positive
  Scenario Outline: Set Button subtext to <subtext>
    When I open default "Button Test" component with "button" json from "commonComponents" using "<nameOfObject>" object name
    Then Button subtext on preview is <subtext>
    Examples:
      | subtext                      | nameOfObject            |
      | mp150ú¿¡üßä                  | subtextOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | subtextSpecialCharacter |

  @positive
  Scenario Outline: Set Button component label to <label>
    When I open default "Button Test" component with "button" json from "commonComponents" using "<nameOfObject>" object name
    Then Button label on preview is <label>
    Examples:
      | label                        | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario: Verify the click function for a Button component
    Given I open "Button Test" component page "default"
    When I click on "button"
    Then click action was called in Actions Tab