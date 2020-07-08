Feature: Menu component
  I want to change Menu component default properties

  Background: Open Menu component default page
    Given I open "Menu" component page

  @positive
  Scenario Outline: Change <menuElement> element of Menu component with set menuType property to <menuType>
    When I select menuType to "<menuType>"
    Then Menu "<menuElement>" element menuType property on preview is "<menuType>"
    Examples:
      | menuElement | menuType  |
      | first       | primary   |
      | second      | primary   |
      | third       | primary   |
      | first       | secondary |
      | second      | secondary |
      | third       | secondary |


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