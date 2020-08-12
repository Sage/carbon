Feature: Carousel component - actions
  I want to check Carousel actions

  Background: Open Carousel component page
    Given I open "Carousel" component page

  @positive
  Scenario: Verify the click event for a clickable slide
    Given I select slideIndex to "1"
      And clear all actions in Actions Tab
    When I click clickable slide
    Then click action was called in Actions Tab
