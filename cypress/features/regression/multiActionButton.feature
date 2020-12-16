Feature: Multi Action Button default component
  I want to test Multi Action Button default component properties

  @positive
  Scenario Outline: Change Multi Action Button text to <text>
    When I open default "Multi Action Button Test" component in noIFrame with "multiActionButton" json from "commonComponents" using "<nameOfObject>" object name
    Then Multi Action Button text on preview is set to <text>
    Examples:
      | text                         | nameOfObject         |
      | mp150ú¿¡üßä                  | textOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | textSpecialCharacter |

  @positive
  Scenario Outline: Change buttonType property of Multi Action Button component to <buttonType>
    When I open default "Multi Action Button Test" component in noIFrame with "multiActionButton" json from "commonComponents" using "<nameOfObject>" object name
    Then Multi Action Button has "<background-color>" background-color
      And Multi Action Button border color is "<border-color>" border-color
    Examples:
      | buttonType | background-color | border-color     | nameOfObject        |
      | primary    | rgb(0, 129, 93)  | rgba(0, 0, 0, 0) | buttonTypePrimary   |
      | secondary  | rgba(0, 0, 0, 0) | rgb(0, 129, 93)  | buttonTypeSecondary |

  @positive
  Scenario Outline: Set Multi Action Button size to <size>
    When I open default "Multi Action Button Test" component in noIFrame with "multiActionButton" json from "commonComponents" using "<nameOfObject>" object name
    Then Multi Action Button height is <height>
    Examples:
      | size   | height | nameOfObject |
      | small  | 32     | sizeSmall    |
      | medium | 40     | sizeMedium   |
      | large  | 48     | sizeLarge    |

  @positive
  Scenario Outline: Check <align> property of Multi Action Button component
    When I open default "Multi Action Button Test" component in noIFrame with "multiActionButton" json from "commonComponents" using "<nameOfObject>" object name
      And I hover on Multi Action Button
    Then Multi Action Button align on preview is "<align>"
    Examples:
      | align | nameOfObject |
      | left  | alignLeft    |
      | right | alignRight   |

  @positive
  Scenario: Disabled Multi Action Button component
    When I open default "Multi Action Button Test" component in noIFrame with "multiActionButton" json from "commonComponents" using "disabled" object name
    Then Multi Action Button state is disabled

  @positive
  Scenario: Enabled Multi Action Button component
    When I open default "Multi Action Button Test" component in noIFrame with "multiActionButton" json from "commonComponents" using "disabledFalse" object name
    Then Multi Action Button state is not disabled

  @positive
  Scenario Outline: Set Multi Action Button subtext to <subtext>
    When I open default "Multi Action Button Test" component in noIFrame with "multiActionButton" json from "commonComponents" using "<nameOfObject>" object name
    Then Multi Action Button subtext on preview is <subtext>
    Examples:
      | subtext                      | nameOfObject            |
      | mp150ú¿¡üßä                  | subtextOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | subtextSpecialCharacter |

  @positive
  Scenario: Invoking Multi Action Button component
    Given I open default "Multi Action Button Test" component in noIFrame with "multiActionButton" json from "commonComponents" using "default" object name
    When I hover on Multi Action Button
    Then Multi Action Button is expanded and contains three items

  @positive
  Scenario Outline: Verify that the Multi Action Button has golden border
    Given I open default "Multi Action Button Test" component in noIFrame with "multiActionButton" json from "commonComponents" using "default" object name
    When I hit Tab key 1 times
    Then Multi Action Button has golden border color

  @positive
  Scenario: Verify background-color after hovering
    Given I open default "Multi Action Button Test" component in noIFrame with "multiActionButton" json from "commonComponents" using "default" object name
    When I hover on Multi Action Button
    Then Multi Action Button has "rgb(0, 96, 70)" background-color

  @positive
  Scenario: Check click event
    Given I open "Multi Action Button Test" component page "default"
      And clear all actions in Actions Tab
    When I click on "button"
    Then click action was called in Actions Tab