Feature: Accessibility tests - Experimental folder
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Component <component> default story
    When I open "Experimental <component>" component page "default" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | checkbox            |
      | date-range          |
      | date-input          |
      | decimal-input       |
      | fieldset            |
      | radiobutton         |
      | simple-color-picker |
      | groupedcharacter    |
      | number-input        |
      | select              |
      | textbox             |
      | textarea            |
      | switch              |

  @accessibility
  Scenario Outline: Component <component> validation story
    When I open "Experimental <component>" component page "validations" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | checkbox            |
      | date-range          |
      | date-input          |
      | decimal-input       |
      | fieldset            |
      | radiobutton         |
      | simple-color-picker |
      | groupedcharacter    |
      | number-input        |
      | select              |
      | switch              |
      | textbox             |
      | textarea            |