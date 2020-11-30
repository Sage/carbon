Feature: Accessibility tests - Experimental folder
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Component <component> default story
    When I open "Experimental <component>" component page "default" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | date-range          |
      | date-input          |
      | decimal-input       |
      | fieldset            |
      | simple-color-picker |
      | select              |
      | textbox             |
      | textarea            |

  @accessibility
  Scenario Outline: Component <component> default_story
    When I open "Experimental <component>" component page "default_story" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component        |
      | checkbox         |
      | groupedcharacter |
      | number-input     |
      | switch           |

  @accessibility
  Scenario Outline: Component <component> validations story
    When I open "Experimental <component>" component page "validations" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component |
      | fieldset  |
      | select    |
      | textbox   |

  @accessibility
  Scenario Outline: Component <component> validations boolean story
    When I open "Experimental <component>" component page "validations boolean" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | date-range          |
      | date-input          |
      | decimal-input       |
      | groupedcharacter    |
      | simple-color-picker |
      | number-input        |
      | textarea            |

  @accessibility
  Scenario Outline: Component <component> validations string story
    When I open "Experimental <component>" component page "validations string component" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | date-range          |
      | date-input          |
      | decimal-input       |
      | groupedcharacter    |
      | simple-color-picker |
      | number-input        |
      | textarea            |

  @accessibility
  Scenario Outline: Component <component> validations string label story
    When I open "Experimental <component>" component page "validations string label" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | date-range          |
      | date-input          |
      | decimal-input       |
      | groupedcharacter    |
      | simple-color-picker |
      | number-input        |
      | textarea            |

  @accessibility
  Scenario Outline: Experimental checkbox component <story> story
    When I open "Experimental checkbox" component page "<story>" in no iframe
    Then "Experimental checkbox <story> story" component has no accessibility violations
    Examples:
      | story                              |
      | group checkbox boolean validation  |
      | group checkbox string validation   |
      | single checkbox boolean validation |
      | single checkbox string validation  |

  @accessibility
  Scenario Outline: Experimental switch component <story> story
    When I open "Experimental switch" component page "<story>" in no iframe
    Then "Experimental switch <story> story" component has no accessibility violations
    Examples:
      | story                                               |
      | single switch boolean validation                    |
      | single switch string validation                     |
      | single switch string validation validation on label |

  @accessibility
  Scenario: Experimental checkbox with asterisk
    When I open "Experimental checkbox" component page "required" in no iframe
    Then "Experimental checkbox with asterisk" component has no accessibility violations

  @accessibility
  Scenario: Experimental RadionButton component with-validations-on-buttons story
    When I open "Experimental RadionButton" component page "with-validations-on-buttons" in no iframe
    Then "Experimental RadionButton with-validations-on-buttons story" component has no accessibility violations