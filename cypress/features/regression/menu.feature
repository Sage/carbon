Feature: Menu component
  I want to change Menu component default properties

  Background: Open Menu component default page
    Given I open "Menu" component page

  @positive @applitools
  Scenario Outline: Change Menu 'as' property to <as>
    When I select as to "<as>"
    Then Menu as property on preview is "<as>"
      And Element displays correctly
    Examples:
      | as        |
      | primary   |
      | secondary |

  @positive @applitools
  Scenario: Check the persistence of Menu element
    # When I open "Menu" component page
    Then Menu elements are visible
      And Element displays correctly

  @positive @applitools
  Scenario: Check the size of the first expandable element of Menu
    When I invoke first expandable Menu component
    Then Menu first expandable element has 2 items
      And Element displays correctly

  @positive @applitools
  Scenario: Check the size of the second expandable element of Menu
    When I invoke second expandable Menu component
    Then Menu second expandable element has 1 link item and 3 list items
      And Element displays correctly