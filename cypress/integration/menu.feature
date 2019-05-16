Feature: Menu component
  I want to change Menu component properties

  Background: Open Menu component page
    Given I open "Menu" component page

  @positive
  Scenario Outline: Change Menu 'as' property
    When I select as to "<as>"
    Then Menu as property on preview is "<as>"
    Examples:
      | as        |
      | primary   |
      | secondary |

  @positive
  Scenario: Check the persistance of Menu element
    Then Menu elements are visible   