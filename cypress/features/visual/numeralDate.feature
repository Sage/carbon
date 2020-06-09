Feature: Numeral Date component
  I want to check that all examples of Numeral Date component render correctly

  @positive
  @applitools
  Scenario Outline: Check that Numeral Date component <story> story renders correctly
    When I open design systems <story> "Numeral Date" component in no iframe
    Then Element displays correctly
    Examples:
      | story                      |
      | custom                     |
      | date_component_has_error   |
      | date_component_has_warning |
      | date_component_has_info    |