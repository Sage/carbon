Feature: Theming addon
  I want to check all components theming

  @positive
  Scenario Outline: I set Button component theme to <theme>
    When I open "button" component with theme "<theme>"
    Then "button" component css "color" is set to "<theme>" common
    Examples:
      | theme  |
      | mint  |
      | aegean |
      | none   |

  @positive
  Scenario Outline: I set Button Toggle component theme to <theme>
    When I open "button-toggle" component with theme "<theme>"
      And I click "button-toggle" component
    Then Button Toggle component css background color is set to "<theme>"
    Examples:
      | theme  |
      | mint  |
      | aegean |
      | none   |

  @positive
  Scenario Outline: I set Icon component theme to <theme>
    When I open Icon component with theme "<theme>"
    Then "icon" component css "background-color" is set to "<theme>" common
    Examples:
      | theme  |
      | mint  |
      | aegean |
      | none   |

  @positive
  Scenario Outline: I set Link component theme to <theme>
    When I open "link" component with theme "<theme>"
    Then Link component css color is set to "<theme>"
    Examples:
      | theme  |
      | mint  |
      | aegean |
      | none   |

  @positive
  Scenario Outline: I set Loader component theme to <theme>
    When I open "loader" component with theme "<theme>"
    Then Loader component css background color is set to "<theme>"
    Examples:
      | theme  |
      | mint  |
      | aegean |
      | none   |

  @positive
  Scenario Outline: I set Multiaction Button component theme to <theme>
    When I open "multi-action-button" component with theme "<theme>"
    Then "button" component css "color" is set to "<theme>" common
      And "button" component css "border-color" is set to "<theme>" common
    Examples:
      | theme  |
      | mint  |
      | aegean |
      | none   |

  @positive
  Scenario Outline: I set Pill component theme to <theme>
    When I open "pill" component with theme "<theme>"
    Then "pill" component css "border-color" is set to "<theme>" common
    Examples:
      | theme  |
      | mint  |
      | aegean |
      | none   |

  @positive
  Scenario Outline: I set Show Edit Pod component theme to <theme>
    When I open "showeditpod" component with theme "<theme>"
    Then Link component css color is set to "<theme>"
    Examples:
      | theme  |
      | mint  |
      | aegean |
      | none   |

  @positive
  Scenario Outline: I set Split Button component theme to <theme>
    When I open "split-button" component with theme "<theme>"
    Then "button" component css "color" is set to "<theme>" common
      And "button" component css "border-color" is set to "<theme>" common
    Examples:
      | theme  |
      | mint  |
      | aegean |
      | none   |

  @positive
  Scenario Outline: I set Step Sequence component theme to <theme>
    When I open "step-sequence" component with theme "<theme>"
    Then "step-sequence-item" component css "color" is set to "<theme>"
    Examples:
      | theme  |
      | mint  |
      | aegean |
      | none   |

  @positive
  Scenario Outline: I set Tabs component theme to <theme>
    When I open "tabs" component with theme "<theme>"
    Then "select-tab" element css "border-bottom-color" is set to "<theme>" common
    Examples:
      | theme  |
      | mint  |
      | aegean |
      | none   |