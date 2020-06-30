Feature: Accessibility tests
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Component <component> default story
    When I open "<component>" component page in noIFrame
    Then "<component>" component has no accessibility violations
    Examples:
      | component                        |
      | experimental-checkbox            |
      | experimental-date-range          |
      | experimental-date-input          |
      | experimental-decimal-input       |
      | experimental-fieldset            |
      | experimental-form                |
      | experimental-radiobutton         |
      | experimental-simple-color-picker |
      | experimental-groupedcharacter    |
      | experimental-number-input        |
      | experimental-select              |
      | experimental-textbox             |
      | experimental-checkbox            |
      | experimental-switch              |
      | experimental-decimal-input       |