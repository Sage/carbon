Feature: Pages component
  I want to test Pages component

  Background: Open Pages component default page
    Given I open "Pages" component page

  @positive
  Scenario Outline: Change Pages component pageIndex to <pageIndex>
    When I select pageIndex to "<pageIndex>"
      And I open component preview
      # wait because of animation
      And I wait 500
    Then My <page> Page is visible
    Examples:
      | pageIndex | page   |
      | 0         | First  |
      | 1         | Second |
      | 2         | Third  |

  @positive
  Scenario Outline: Open and close page by index <pageIndex>
    Given I select pageIndex to "<pageIndex>"
    When I open component preview
      And I close page
    Then page is closed
    Examples:
      | pageIndex |
      | 0         |
      | 1         |
      | 2         |

  @positive
  Scenario: Go to second page
    Given I open component preview
    When I go to second page
    Then My Second Page is visible
      And other pages except Second Page are not visible

  @positive
  Scenario: Go to third page
    When I open component preview
      And I go to second page
      And I go to third page
    Then My Third Page is visible
      And other pages except Third Page are not visible

  @positive
  Scenario: Go back from second page to first page
    Given I select pageIndex to "1"
      And I open component preview
      # wait because of animation
      And I wait 1000
    When I go back
    Then My First Page is visible
      And other pages except First Page are not visible

  @positive
  Scenario: Go back from third page to first page
    Given I select pageIndex to "2"
      And I open component preview
      # wait because of animation
      And I wait 1000
    When I go back
    Then My First Page is visible
      And other pages except First Page are not visible

 @positive
  Scenario: Open event
    Given clear all actions in Actions Tab
    When I open component preview
    Then open action was called in Actions Tab

   @positive
  Scenario: Cancel event
    Given I open component preview
      And clear all actions in Actions Tab
    When I close page
    Then cancel action was called in Actions Tab