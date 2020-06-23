Feature: Create component
  I want to change Create component properties

  Background: Open Create component page
    Given I open "Create" component page

  @positive
  Scenario: Verify inner content and colors of Create component on hover state
    Given I click outside of the component
    When I hit Tab key 1 time
    Then Create component has proper inner color "rgb(0, 129, 93)" and background-color "rgb(255, 255, 255)" and border color "rgb(102, 133, 146)"
      And Create element has golden border on focus

  @positive
  Scenario Outline: Change children in Create component to <children>
    When I set children to <children> word
    Then create children on preview is <children>
    Examples:
      | children                |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario Outline: Change className in Create component <className>
    When I set className to <className> word
    Then create className on preview is <className>
    Examples:
      | className               |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |
# @ignore because of FE-2782
# | &"'<>|