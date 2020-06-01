Feature: Flat table component
  I want to check that Flat table component had render proper themes

  @positive
  @applitools
  Scenario Outline: Check that Flat table component <story> rendered correctly
    Given I open design systems <story> "Flat table" component in no iframe
    Then Element displays correctly
    Examples:
      | story                   |
      | basic                   |
      | light_theme             |
      | transparent_base_theme  |
      | transparent_white_theme |
      | paginated               |
      | selectable_rows         |
      | with_colspan            |
      | with_row_header         |
      | with_rowspan            |

  @positive
  @applitools
  Scenario: Verify Flat table color row when row is selected
    Given I open design systems when_a_child_of_sidebar "Flat table" component in no iframe
    When I check "first" flat table checkbox
    Then Element displays correctly

  @positive
  @applitools
  Scenario: Verify Flat table color row when row is highlighted
    Given I open design systems when_a_child_of_sidebar "Flat table" component in no iframe
    When I click onto "first" row
    Then Element displays correctly

  @positive
  @applitools
  Scenario: Verify Flat table color row when row hovers
    Given I open design systems when_a_child_of_sidebar "Flat table" component in no iframe
    When I hover mouse onto "first" row
    Then Element displays correctly