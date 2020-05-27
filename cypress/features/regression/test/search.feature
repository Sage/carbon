Feature: Search component
  I want to change Search component properties

  Background: Open Search component page
    Given I open basic Test "Search" component page

  @positive
  Scenario Outline: Set placeholder to <placeholder>
    When I set placeholder to <placeholder> word
    Then Search component placeholder is set to <placeholder>
    Examples:
      | placeholder                  |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  # will remove when Applitools will be implemented
  @positive
  Scenario: Verify proper color for search icon button
    Given Type "Sea" text into search input
    When I click onto search icon
    Then search icon has proper inner color

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
  Scenario: Click event for Search icon
    Given Type "Search" text into search input
      And clear all actions in Actions Tab
    When I click onto search icon
    Then click action was called in Actions Tab