Feature: Pages component
  I want to test Pages component

  @positive
  Scenario Outline: Change Pages component pageIndex to <pageIndex>
    Given I open Basic "Pages Test" component in noIFrame with "pages" json from "commonComponents" using "<nameOfObject>" object name
    When I open Pages component preview
    Then My <page> Page is visible
    Examples:
      | pageIndex | page   | nameOfObject |
      | 0         | First  | pageIndex0   |
      | 1         | Second | pageIndex1   |
      | 2         | Third  | pageIndex2   |

  @positive
  Scenario Outline: Open and close page by index <pageIndex>
    Given I open Basic "Pages Test" component in noIFrame with "pages" json from "commonComponents" using "<nameOfObject>" object name
    When I open Pages component preview
      And I close page
    Then page is closed
    Examples:
      | pageIndex | nameOfObject |
      | 0         | pageIndex0   |
      | 1         | pageIndex1   |
      | 2         | pageIndex2   |

  @positive
  Scenario: Go to second page
    Given I open Basic "Pages Test" component in noIFrame with "pages" json from "commonComponents" using "pageIndex0" object name
      And I open Pages component preview
    When I go to second page
    Then My Second Page is visible
      And other pages except Second Page are not visible

  @positive
  Scenario: Go to third page
    Given I open Basic "Pages Test" component in noIFrame with "pages" json from "commonComponents" using "pageIndex0" object name
      And I open Pages component preview
      And I go to second page
    When I go to third page
    Then My Third Page is visible
      And other pages except Third Page are not visible

  @positive
  Scenario: Go back from second page to first page
    Given I open Basic "Pages Test" component in noIFrame with "pages" json from "commonComponents" using "pageIndex1" object name
      And I open Pages component preview
    When I go back
    Then My First Page is visible
      And other pages except First Page are not visible

  @positive
  Scenario: Go back from third page to second page
    Given I open Basic "Pages Test" component in noIFrame with "pages" json from "commonComponents" using "pageIndex2" object name
      And I open Pages component preview
    When I go back
    Then My Second Page is visible
      And other pages except Second Page are not visible

  @positive
  Scenario: Open event
    Given I open "Pages Test" component page "Basic"
      And clear all actions in Actions Tab
    When I open Pages component preview in Iframe
    Then open action was called in Actions Tab

  @positive
  Scenario: Cancel event
    Given I open "Pages Test" component page "Basic"
      And I open Pages component preview in Iframe
      And clear all actions in Actions Tab
    When I close page in IFrame
    Then cancel action was called in Actions Tab