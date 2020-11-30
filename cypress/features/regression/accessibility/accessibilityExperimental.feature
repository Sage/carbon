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
      | select              |
      | textbox             |
      | textarea            |
      | switch              |

  @accessibility
  Scenario Outline: Component <component> default_story
    When I open "Experimental <component>" component page "default_story" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component        |
      | groupedcharacter |
      | number-input     |

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

  @accessibility
  Scenario: Experimental checkbox with asterisk
    When I open "Experimental checkbox" component page "required" in no iframe
    Then "Experimental checkbox with asterisk" component has no accessibility violations