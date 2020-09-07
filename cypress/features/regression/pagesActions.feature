Feature: Pages component in IFrame
  I want to test Pages component

  Background: Open Pages component default page
    Given I open "Pages" component page

 @positive
  Scenario: Go to second page
    Given I open Pages component preview in Iframe
    When I go to second page
    Then My Second Page is visible in Iframe
      And other pages except Second Page are not visible

  @positive
  Scenario: Go to third page
    When I open Pages component preview in Iframe
      And I go to second page
      And I go to third page
    Then My Third Page is visible in Iframe
      And other pages except Third Page are not visible

  @positive
  Scenario: Go back from second page to first page
    Given I select pageIndex to "1"
      And I open Pages component preview in Iframe
      # wait because of animation
      And I wait 1000
    When I go back
    Then My First Page is visible in Iframe
      And other pages except First Page are not visible

  @positive
  Scenario: Go back from third page to first page
    Given I select pageIndex to "2"
      And I open Pages component preview in Iframe
      # wait because of animation
      And I wait 1000
    When I go back
    Then My First Page is visible in Iframe
      And other pages except First Page are not visible

 @positive
  Scenario: Open event
    Given clear all actions in Actions Tab
    When I open Pages component preview in Iframe
    Then open action was called in Actions Tab

   @positive
  Scenario: Cancel event
    Given I open Pages component preview in Iframe
      And clear all actions in Actions Tab
    When I close page in IFrame
    Then cancel action was called in Actions Tab