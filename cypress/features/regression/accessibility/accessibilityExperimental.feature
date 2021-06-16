Feature: Accessibility tests - Experimental folder
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Component <component> default story
    When I open "Experimental <component>" component page "default story" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | simple-color-picker |

  @accessibility
  Scenario Outline: Component <component> validations boolean story
    When I open "Experimental <component>" component page "validations boolean" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | simple-color-picker |

  @accessibility
  Scenario Outline: Component <component> validations string story
    When I open "Experimental <component>" component page "validations string component" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | simple-color-picker |

  @accessibility
  Scenario Outline: Component <component> validations string label story
    When I open "Experimental <component>" component page "validations string label" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | simple-color-picker |
