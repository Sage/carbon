Feature: Popover container component
  I want to test Popover container component properties

  @positive
  Scenario Outline: Change Popover container component title to <title>
    Given I open default "Popover container Test" component with "popoverContainer" json from "commonComponents" using "<nameOfObject>" object name
    When I open popover container
    Then Popover title on preview is set to <title>
    Examples:
      | title                        | nameOfObject          |
      | mp150ú¿¡üßä                  | titleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | titleSpecialCharacter |

  @positive
  Scenario: Popover container is opened
    Given I open "Popover container" component page "default story"
    When I open popover container
    Then Popover container is visible

  @positive
  Scenario: Popover container is closed
    Given I open "Popover container" component page "default story"
      And I open popover container
    When I click popover close icon
    Then Popover container is not visible

  @positive
  Scenario Outline: Open Popover container is opened using <key> key
    Given I open "Popover container" component page "default story"
    When I click onto popover setting icon using "<key>" key
    Then Popover container is visible
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario Outline: Open Popover container is closed using <key> key
    Given I open "Popover container" component page "default story"
      And I click onto popover setting icon using "<key>" key
    When I press onto closeIcon using "<key>" key
    Then Popover container is not visible
    Examples:
      | key   |
      | Enter |
      | Space |