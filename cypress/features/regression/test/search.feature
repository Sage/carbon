Feature: Search component
  I want to test Search component properties

  @positive
  Scenario Outline: Set placeholder to <placeholder>
    When I open Test test_default "Search" component in noIFrame with "search" json from "test" using "<nameOfObject>" object name
    Then Search component placeholder is set to <placeholder>
    Examples:
      | placeholder                  | nameOfObject                |
      | mp150ú¿¡üßä                  | placeholderOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | placeholderSpecialCharacter |

  @positive
  Scenario: Verify proper color for search icon button
    Given I open "Design System Search Test" component page "default"
      And Type "Sea" text into search input
    When I click onto search icon
    Then search icon has proper inner color

  @positive
  Scenario: Check the change event for Search component
    Given I open "Design System Search Test" component page "default"
      And clear all actions in Actions Tab
    When Type "Search" text into search input
    Then change action was called in Actions Tab

  @positive
  Scenario: Check the blur event for Search component
    Given I open "Design System Search Test" component page "default"
      And clear all actions in Actions Tab
      And I click inside input
    When I click "search" icon in iFrame
    Then blur action was called in Actions Tab

  @positive
  Scenario: Click event for Search icon
    Given I open "Design System Search Test" component page "default"
      And Type "Search" text into search input
      And clear all actions in Actions Tab
    When I click onto search icon
    Then click action was called in Actions Tab