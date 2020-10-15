Feature: Button Toggle component
  I want to test Button Toggle component properties

  @positive
  Scenario Outline: Set Button Toggle childen to <label>
    When I open test_basic "Button Toggle" component in noIFrame with "buttonToggle" json from "commonComponents" using "<nameOfObject>" object name
    Then Button Toggle label on preview is <label>
    Examples:
      | label                        | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario Outline: Verify the onChange event for Button Toggle
    Given I open "Button Toggle Test" component page "basic"
      And clear all actions in Actions Tab
    When I click on Button Toggle <index>
    Then onChange action was called in Actions Tab
    Examples:
      | index |
      | 0     |
      | 1     |
      | 2     |