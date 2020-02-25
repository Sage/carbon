Feature: Alert component
  I want to change Alert component properties

  Background: Open Alert component page
    Given I open "Alert" component page with button

  @applitools
  Scenario Outline: Change Alert component title to <title>
    When I set title to "<title>"
      And I open component preview
    Then Element displays correctly
    Examples:
      | title                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <>                       |

  @applitools
  Scenario: Check open click event
    When clear all actions in Actions Tab
      And I open component preview
    Then Element displays correctly
