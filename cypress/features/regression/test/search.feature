Feature: Search component
  I want to change Search component properties

  Background: Open Search component page
    Given I open basic Test "Search" component page

  @positive
  Scenario Outline: Set placeholder to <placeholder>
    When I set placeholder to "<placeholder>"
    Then Search component placeholder is set to "<placeholder>"
    Examples:
      | placeholder             |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Verify inner text is set to <text> and threshold to <threshold> and search icon has golden border
    Given I set threshold to "<threshold>"
      And Type "<text>" text into search input
    When I click onto search icon
    Then search icon has golden border
    Examples:
      | text | threshold |
      | t    | 1         |
      | te   | 2         |
      | test | 4         |

  @positive
  Scenario: searchButton property is enabled
    When Type "S" text into search input
    Then search icon as button is visible

  @positive
  Scenario: searchButton property is disabled
    Given I uncheck searchButton checkbox
    When Type "S" text into search input
    Then search icon as button is not visible

  @positive
  Scenario: Verify inner elements in Search component
    # commented because of BDD default scenario Given - When - Then
    # When I open "Experimental Search" component page
    Then Search component has input and "search" as icon

  @positive
  Scenario: Verify inner elements in Search component after change icon
    When Type "Search" text into search input
    Then Search component has input and "cross" as icon
      And Search component input has golden border

  @positive
  Scenario: Verify inner elements in Search component after clearing the input
    Given I uncheck searchButton checkbox
      And Type "Search" text into search input
    When I click on cross icon
    Then Search component has input and "search" as icon

  @positive
  Scenario: Verify golden outline for search icon
    Given Type "Sea" text into search input
    When I click onto search icon
    Then search icon has golden border

  @positive
  Scenario: Check the change event for Search component
    Given clear all actions in Actions Tab
    When Type "Search" text into search input
    Then change action was called in Actions Tab

  @positive
  Scenario: Check the blur event for Search component
    Given clear all actions in Actions Tab
      And I click inside input
    When I click outside of the component in DLS directory
    Then blur action was called in Actions Tab

  @positive
  Scenario: Verify proper color for search icon button
    Given Type "Sea" text into search input
    When I click onto search icon
    Then search icon has proper inner color

  @positive
  Scenario: Verify inner elements text is cleared after click on cross icon
    Given Type "Search" text into search input
    When I click on cross icon
    Then search input is empty

  @positive
  Scenario: Click event for Search icon
    Given Type "Search" text into search input
      And clear all actions in Actions Tab
    When I click onto search icon
    Then click action was called in Actions Tab