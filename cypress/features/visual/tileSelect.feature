Feature: Tile Select component
  I want to check that all examples of Tile Select component render correctly

  @positive
  @applitools
  Scenario Outline: Check that basic Tile Select render correctly with theme set to <theme>
    When I open design systems basic "Tile Select" component with theme "<theme>"
    Then Element displays correctly
    Examples:
      | theme |
      | mint  |

  @positive
  @applitools
  Scenario Outline: Check that single Tile Select render correctly with theme set to <theme>
    When I open design systems single_select "Tile Select" component with theme "<theme>"
    Then Element displays correctly
    Examples:
      | theme  |
      | aegean |
      | none   |