Feature: Toast component
  I want to test Toast component properties

  @positive
  Scenario: Verify the click action in Actions Tab
    Given I open "Toast Test" component page "default"
    When I click closeIcon
    Then click action was called in Actions Tab

  @positive
  Scenario Outline: Change Toast children to <children>
    When I open default "Toast Test" component with "toast" json from "commonComponents" using "<nameOfObject>" object name
    Then Toast children is set to <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario: Verify that Toast is closed by pressing Esc key
    Given I open "Toast Test" component page "default"
    When I hit ESC key
    Then Toast component is not visible

  @positive
  Scenario: CloseIcon has the border outline
    Given I open "Toast" component page "dismissible"
      And I click on "button-toast-dismissible" Toggle Preview
    When closeIcon is focused
    Then closeIcon has the border outline color "rgb(255, 181, 0)" and width "3px"

  @positive
  Scenario: Confirm that when isCenter property is false Toast is left aligned
    Given I open "Toast" component page "left aligned"
    When I click on "button-left-aligned" Toggle Preview
    Then Toast is not centred

  @positive
  Scenario: Confirm that Toast is centered by default
    Given I open "Toast" component page "default story"
    When I click on "button-default" Toggle Preview
    Then Toast is centred