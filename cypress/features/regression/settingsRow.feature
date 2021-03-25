Feature: Settings Row component
  I want to test Settings Row component

  @positive
  Scenario Outline: Change Settings Row children to <children>
    When I open default "Setting Row Test" component in noIFrame with "settingsRow" json from "commonComponents" using "<nameOfObject>" object name
    Then Settings Row children on preview is set to <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario Outline: Change Settings Row title to <title>
    When I open default "Setting Row Test" component in noIFrame with "settingsRow" json from "commonComponents" using "<nameOfObject>" object name
    Then Settings Row title on preview is set to <title>
    Examples:
      | title                        | nameOfObject          |
      | mp150ú¿¡üßä                  | titleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | titleSpecialCharacter |

  @positive
  Scenario Outline: Change Settings Row description to <description>
    When I open default "Setting Row Test" component in noIFrame with "settingsRow" json from "commonComponents" using "<nameOfObject>" object name
    Then Settings Row description on preview is set to <description>
    Examples:
      | description                  | nameOfObject                |
      | mp150ú¿¡üßä                  | descriptionOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | descriptionSpecialCharacter |

  @positive
  Scenario: Disable divider for a Settings Row component
    When I open default "Setting Row Test" component in noIFrame with "settingsRow" json from "commonComponents" using "dividerFalse" object name
    Then Settings Row component has no divider property