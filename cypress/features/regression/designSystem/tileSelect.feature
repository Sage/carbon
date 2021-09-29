Feature: TileSelect component
  I want to test TileSelect component

  Background: Open Search component page
    Given I open "Tile Select" component page "single tile"

  @positive
  Scenario: Single tile is checked
    When I click on single tile component
    Then Single tile is checked
      And Single tile has golden focus

  @positive
  Scenario: Single tile is deselect
    Given I click on single tile component
    When I click deselect button
    Then Single tile is not check