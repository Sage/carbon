Feature: Accessibility tests
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Component <component> without activation button
    Given I open "<component>" component page
    When I open Accessibility Tab
    Then "<component>" component has no violations in Accessibility section
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