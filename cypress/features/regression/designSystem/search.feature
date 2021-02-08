Feature: Design System Search component
  I want to test Design System Search component

  @positive
  Scenario: Search input is empty after click on cross icon
    Given I open "Design System Search" component page "default story" in no iframe
      And Type "Search" text into default search input
    When I click on cross icon
    Then search input is empty

  @positive
  Scenario: Search icon has golden outline
    Given I open "Design System Search" component page "with search button" in no iframe
      And Type "Sea" text into search with button input
    When I click on search icon
    Then search icon has golden border

  @positive
  Scenario: searchButton property is enabled
    Given I open "Design System Search" component page "with search button" in no iframe
    When Type "S" text into search with button input
    Then search icon as button is visible

  @positive
  Scenario: searchButton property is disabled
    Given I open "Design System Search" component page "default story" in no iframe
    When Type "S" text into default search input
    Then search icon as button is not visible

  @positive
  Scenario: Verify inner elements in Search component when is empty
    Given I open "Design System Search" component page "default story" in no iframe
    When I clear default search input
    Then Search component has input and "search" as icon

  @positive
  Scenario: Verify inner elements in Search component when is filled
    Given I open "Design System Search" component page "default story" in no iframe
    When Type "Search" text into default search input
    Then Search component has input and "cross" as icon
      And Search component input has golden border

  @positive
  Scenario: Cross icon has gold outline when focused
    Given I open "Design System Search" component page "default story" in no iframe
      And Type "Search" text into default search input
    When I focus on cross icon
    Then Cross icon has golden border

  @positive
  Scenario Outline: Clear search input clicking on cross icon via <keyboard>
    Given I open "Design System Search" component page "default story" in no iframe
      And Type "Search" text into default search input
      And I hit Tab key 1 times in no Iframe
    When I press onto cross icon using "<keyboard>" key
    Then search input is empty
    Examples:
      | keyboard |
      | Enter    |
      | Space    |