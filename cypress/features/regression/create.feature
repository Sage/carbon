Feature: Create component
  I want to change Create component properties

  Background: Open Create component page
    Given I open "Create" component page

  @positive
  Scenario: Verify inner content and colors of Create component
    # commented because of BDD default scenario Given - When - Then
    # When I open "Create" component page
    Then Create component has proper inner color "rgb(0, 128, 93)" and background-color "rgb(242, 244, 245)" and border color "rgb(102, 132, 145)"

  @positive
  Scenario: Verify inner content and colors of Create component on hover state
    Given I click outside of the component
    When I hit Tab key 1 time
    Then Create component has proper inner color "rgb(0, 128, 93)" and background-color "rgb(255, 255, 255)" and border color "rgb(102, 132, 145)"
      And Create element has golden border on focus

  @positive
  Scenario Outline: Change children in Create component to <children>
    When I set children to "<children>"
    Then create children on preview is "<children>"
    Examples:
      | children                 |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario Outline: Change className in Create component <className>
    When I set className to "<className>"
    Then create className on preview is "<className>"
    Examples:
      | className                |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      # @ignore because of FE-1447
      # | <>                       |