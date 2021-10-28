Feature: Help component
  I want to test Help component properties

  @positive
  Scenario Outline: Change children to <children>
    When I open default "Help Test" component with "help" json from "commonComponents" using "<nameOfObject>" object name
      And I hover mouse onto help icon
    Then tooltipPreview on preview is set to <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |


  @positive
  Scenario Outline: Change href to <href>
    When I open default "Help Test" component with "help" json from "commonComponents" using "<nameOfObject>" object name
    Then Help href on preview is set to <href>
    Examples:
      | href                         | nameOfObject         |
      | mp150ú¿¡üßä                  | hrefOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | hrefSpecialCharacter |

  @positive
  Scenario: Help component should have focus 
    Given I open "Help Test" component page "default story"
    When I hit Tab key 1 time