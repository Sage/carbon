Feature: Flash component
  I want to test Flash component properties

  @positive
  Scenario Outline: Change flash message to <message>
    Given I open default "Flash" component in noIFrame with "flash" json from "commonComponents" using "<nameOfObject>" object name
    When I open Flash dialog
    Then Flash is visible
      And Flash message is set to <message>
    Examples:
      | message                      | nameOfObject            |
      | mp150ú¿¡üßä                  | messageOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | messageSpecialCharacter |

  @positive
  Scenario Outline: Change flash as prop to <as>
    Given I open default "Flash" component in noIFrame with "flash" json from "commonComponents" using "<nameOfObject>" object name
    When I open Flash dialog
    Then Flash is set to <as>
    Examples:
      | as      | nameOfObject |
      | success | asSuccess    |
      | error   | asError      |