Feature: Alert component classic story
  I want to change Alert component properties for classic story

  Background: Open Alert component page for classic story
    Given I open "Alert" component with button classic page
      And I open component preview

  @positive
  Scenario: CloseIcon has the border outline
    Given closeIcon is focused
    Then closeIcon has border outline for classic story
