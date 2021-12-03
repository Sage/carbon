Feature: Theming addon
  I want to check all components theming

  @positive
  Scenario Outline: I set Button component theme to <theme>
    When I open default "Button Test" component with "themeNames" json from "themes" using "<nameOfObject>" object name
    Then "button" component css "color" is set to "<theme>" common
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |

  @positive
  Scenario Outline: I set Button Toggle component theme to <theme>
    When I open default-story "Button Toggle" component with "themeNames" json from "themes" using "<nameOfObject>" object name
      And I click "button-toggle" component
    Then Button Toggle component css background color is set to "<theme>"
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |

  @positive
  Scenario Outline: I set Link component theme to <theme>
    When I open default "Link Test" component with "themeNames" json from "themes" using "<nameOfObject>" object name
    Then Link component css color is set to "<theme>"
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |

  @positive
  Scenario Outline: I set Loader component theme to <theme>
    When I open default "Loader Test" component with "themeNames" json from "themes" using "<nameOfObject>" object name
    Then Loader component css background color is set to "<theme>"
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |

  @positive
  Scenario Outline: I set Loader Bar component theme to <theme>
    When I open default "Loader Bar Test" component with "themeNames" json from "themes" using "<nameOfObject>" object name
    Then Loader Bar component css background color is set to "<theme>"
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |

  @positive
  Scenario Outline: I set Multiaction Button component theme to <theme>
    When I open default-story "Multi action button" component with "themeNames" json from "themes" using "<nameOfObject>" object name
    Then "button" component css "color" is set to "<theme>" common
      And "button" component css "border-color" is set to "<theme>" common
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |

  @positive
  Scenario Outline: I set Pill component theme to <theme>
    When I open default "Pill Test" component with "themeNames" json from "themes" using "<nameOfObject>" object name
    Then "pill" component css "border-color" is set to "<theme>" common
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |

  @positive
  Scenario Outline: I set Show Edit Pod component theme to <theme>
    When I open default "Showeditpod Test" component with "themeNames" json from "themes" using "<nameOfObject>" object name
    Then Link component css color is set to "<theme>"
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |

  @positive
  Scenario Outline: I set Split Button component theme to <theme>
    When I open default-story "Split Button" component with "themeNames" json from "themes" using "<nameOfObject>" object name
    Then "button" component css "color" is set to "<theme>" common
      And "button" component css "border-color" is set to "<theme>" common
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |

  @positive
  Scenario Outline: I set Step Sequence component theme to <theme>
    When I open step-sequence "Step Sequence Test" component with "themeNames" json from "themes" using "<nameOfObject>" object name
    Then "step-sequence-item" component css "color" is set to "<theme>"
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |

  @positive
  Scenario Outline: I set Tabs component theme to <theme>
    When I open default "Tabs Test" component with "themeNames" json from "themes" using "<nameOfObject>" object name
    Then "tab-selected-indicator" element css "box-shadow" is set to "<theme>" common
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |
