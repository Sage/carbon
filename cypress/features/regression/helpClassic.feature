Feature: Help component
  I want to change Help component properties

  Background: Open Help component page
    Given I open "Help" component page classic

  @positive
  Scenario: Verify default color for help icon for classic story
    # When I open "Help" component page classic
    Then icon on preview has "rgb(128, 153, 164)" color