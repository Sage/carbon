Feature: Popover container component
  I want to test Popover container component properties

  @positive
  Scenario Outline: Change Popover container component title to <title>
    Given I open Test default "Popover container" component in noIFrame with "popoverContainer" json from "test" using "<nameOfObject>" object name
    When I open popover container in NoIFrame
    Then Popover title on preview is set to <title>
    Examples:
      | title                        | nameOfObject          |
      | mp150ú¿¡üßä                  | titleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | titleSpecialCharacter |