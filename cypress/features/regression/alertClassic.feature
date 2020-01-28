Feature: Alert component classic story
  I want to change Alert component properties for classic story

  Background: Open Alert component page for classic story
    Given I open "Alert" component with button classic page

  @ignore
  @FE-2508
  Scenario: CloseIcon has the border outline
    When I open component preview
      And I hit Tab key 1 time
    Then closeIcon has no border outline for classic story