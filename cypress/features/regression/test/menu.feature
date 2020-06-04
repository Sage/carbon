Feature: Menu component
  I want to change Menu component default properties

  Background: Open Menu component default page
    Given I open basic Test "Menu" component page

  @positive
  Scenario: Verify the click function for a Menu component
    Given clear all actions in Actions Tab
    When I click on first item in Menu component
    Then onClick action was called in Actions Tab

  @positive
  Scenario Outline: Change Menu 'as' property to <as>
    When I select as to "<as>"
    Then Menu as property on preview is "<as>"
    Examples:
      | as        |
      | primary   |
      | secondary |

  @positive
  Scenario: Check the persistence of Menu element
    # When I open "Menu" component page
    Then Menu elements are visible

  @positive
  Scenario: Check the size of the first expandable element of Menu
    When I invoke first expandable Menu component
    Then Menu first expandable element has 2 items

  @positive
  Scenario: Check the size of the second expandable element of Menu
    When I invoke second expandable Menu component
    Then Menu second expandable element has 1 link item and 3 list items
