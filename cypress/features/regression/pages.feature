Feature: Pages component
  I want to test Pages component

  @positive
  Scenario Outline: Change Pages component pageIndex to <pageIndex>
    Given I open default "Pages" component in noIFrame with "pages" json from "commonComponents" using "<nameOfObject>" object name
    When I open Pages component preview
    Then My <page> Page is visible
    Examples:
      | pageIndex | page   | nameOfObject |
      | 0         | First  | pageIndex0   |
      | 1         | Second | pageIndex1   |
      | 2         | Third  | pageIndex2   |

  @positive
  Scenario Outline: Open and close page by index <pageIndex>
    Given I open default "Pages" component in noIFrame with "pages" json from "commonComponents" using "<nameOfObject>" object name
    When I open Pages component preview
      And I close page
    Then page is closed
    Examples:
      | pageIndex | nameOfObject |
      | 0         | pageIndex0   |
      | 1         | pageIndex1   |
      | 2         | pageIndex2   |