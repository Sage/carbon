Feature: Design System TileSelect component
  I want to test Design System TileSelect component

  Background: Open Design System Search component page
    Given I open design systems single_tile "Tile Select" component in no iframe

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