# Tests are ignore due to development waiting phase. Scenarios need to be refactor after merge FE-1587
Feature: Pages component
  I want to test Pages component

  Background: Open Pages component page
    Given I open "Pages" component page

  @ignore @positive
  Scenario: Open first page
    When I open component preview
    Then My First Page is visible

  @positive
  Scenario: Open and close first page
    When I open component preview
      And I close page
    Then My First Page is not visible
      And My Second Page is not visible

  @ignore @positive
  Scenario: Open second page
    When I open component preview
      And I go to second page
    Then My Second Page is visible

  @ignore @positive
  Scenario: Open and close second page
    When I open component preview
      And I go to second page
      And I close page
    Then My First Page is not visible
      And My Second Page is not visible

  @ignore @positive
  Scenario: Open and close third page
    When I open component preview
      And I go to second page
      And I go to third page
      And I close page
    Then My First Page is not visible
      And My Second Page is not visible
      And My Third Page is not visible

  @ignore @positive
  Scenario: Go back to first page
    When I open component preview
      And I go to second page
      And I go to third page
    Then My Third Page is visible
      And I go to second page
      And I go to first page
      And My First Page is visible

  @ignore @positive
  Scenario Outline: Change Pages component pageIndex to <pageIndex>
    When I select pageIndex to "<pageIndex>"
      And I open component preview
    Then My <page> Page is visible
    Examples:
      | pageIndex | page   |
      | 0         | First  |
      | 1         | Second |
      | 2         | Third  |