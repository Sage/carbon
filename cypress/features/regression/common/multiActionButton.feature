Feature: Multi Action Button default component
  I want to test Multi Action Button default component properties

  @positive
  Scenario Outline: Change Multi Action Button text to <text>
    When I open default "Multi Action Button Test" component with "multiActionButton" json from "commonComponents" using "<nameOfObject>" object name
    Then Multi Action Button text on preview is set to <text>
    Examples:
      | text                         | nameOfObject         |
      | mp150ú¿¡üßä                  | textOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | textSpecialCharacter |

  @positive
  Scenario Outline: Set Multi Action Button subtext to <subtext>
    When I open default "Multi Action Button Test" component with "multiActionButton" json from "commonComponents" using "<nameOfObject>" object name
    Then Multi Action Button subtext on preview is <subtext>
    Examples:
      | subtext                      | nameOfObject            |
      | mp150ú¿¡üßä                  | subtextOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | subtextSpecialCharacter |

  @positive
  Scenario: Invoking Multi Action Button component
    Given I open default "Multi Action Button Test" component with "multiActionButton" json from "commonComponents" using "default" object name
    When I hover on Multi Action Button
    Then Multi Action Button is expanded and contains three items

  @positive
  Scenario Outline: Verify that the Multi Action Button has golden border
    Given I open default "Multi Action Button Test" component with "multiActionButton" json from "commonComponents" using "default" object name
    When I hit Tab key 1 times
    Then Multi Action Button has golden border color

  @positive
  Scenario: Verify background-color after hovering
    Given I open default "Multi Action Button Test" component with "multiActionButton" json from "commonComponents" using "default" object name
    When I hover on Multi Action Button
    Then Multi Action Button has "rgb(0, 96, 70)" background-color

  @positive
  Scenario: Check click event
    Given I open "Multi Action Button Test" component page "default"
    When I click on "button"
    Then click action was called in Actions Tab

  @positive
  Scenario: Invoking Multi Action Button component in a hidden container
    Given I open "Multi Action Button" component page "in overflow hidden container"
      And I expand accordionRow using "Enter" key
    When I hover on Multi Action Button
    Then Multi Action Button in a hidden container is expanded and contains three items