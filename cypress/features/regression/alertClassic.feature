Feature: Alert component classic story
  I want to change Alert component properties for classic story

  Background: Open Alert component page for classic story
    Given I open "Alert" component with button classic page

  @positive
  Scenario: CloseIcon has the border outline
    When I open component preview
    Given closeIcon is focused
    Then closeIcon has border outline for classic story
