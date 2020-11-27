Feature: Accessibility tests - Experimental folder
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Component <component> default story
    When I open "Experimental <component>" component page "default" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | date-input          |
      | decimal-input       |
      | fieldset            |
      | simple-color-picker |
      | groupedcharacter    |
      | number-input        |
      | select              |
      | textbox             |
      | textarea            |

  @accessibility
  Scenario Outline: Component <component> default_story
    When I open "Experimental <component>" component page "default_story" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component  |
      | date-range |

  @accessibility
  Scenario Outline: Component <component> validation story
    When I open "Experimental <component>" component page "validations" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | date-input          |
      | decimal-input       |
      | fieldset            |
      | simple-color-picker |
      | groupedcharacter    |
      | number-input        |
      | select              |
      | textbox             |
      | textarea            |

  @accessibility
  Scenario: Experimental checkbox with asterisk
    When I open "Experimental checkbox" component page "required" in no iframe
    Then "Experimental checkbox with asterisk" component has no accessibility violations

  @accessibility
  Scenario Outline: Component <component> basic story
    When I open "Experimental <component>" component page "basic" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component  |
      | checkbox   |
      | switch     |

  @accessibility
  Scenario Outline: Component <component> default story
    When I open "Experimental <component>" component page "with_legend_and_labels" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component   |
      | radiobutton |