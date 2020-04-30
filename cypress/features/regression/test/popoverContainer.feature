Feature: Popover container component
  I want to change Popover container component properties

  Background: Open Popover container component page
    Given I open basic Test "Popover container" component page
      And I open popover container

  @positive
  Scenario Outline: Change Popover container component title to <title>
    When I set title to "<title>"
    Then Popover title on preview is set to "<title>"
    Examples:
      | title                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |
  # @ignore because of FE-1447
  # | <>                       |