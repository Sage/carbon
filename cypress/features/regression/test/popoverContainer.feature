Feature: Popover container component
  I want to change Popover container component properties

  Background: Open Popover container component page
    Given I open "Design System Popover container Test" component page "basic"
      And I open popover container

  @positive
  Scenario Outline: Change Popover container component title to <title>
    When I set title to <title> word
    Then Popover title on preview is set to <title>
    Examples:
      | title                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |
# @ignore because of FE-2782
# | &"'<>|