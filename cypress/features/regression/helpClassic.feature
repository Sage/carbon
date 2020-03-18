Feature: Help component classic story
  I want to check Help component classic story default color

  Background: Open Help component classic story
    Given I open "Help" component page classic

  @positive
  Scenario: Verify default color for help icon for classic story
    # commented because of BDD default scenario Given - When - Then
    # When I open "Help" component page classic
    Then icon on preview has "rgb(128, 153, 164)" color