Feature: Theming addon
  I want to check all components theming

  @positive
  Scenario Outline: I set Button component theme to <theme>
    When I open knobs "Design System Button Test" component in noIFrame with "themeNames" json from "themes" using "<nameOfObject>" object name
    Then "button" component css "color" is set to "<theme>" common
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |

  @positive
  Scenario Outline: I set Button Toggle component theme to <theme>
    When I open default "Button Toggle" component in noIFrame with "themeNames" json from "themes" using "<nameOfObject>" object name
      And I click "button-toggle" component
    Then Button Toggle component css background color is set to "<theme>"
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |

  @positive
  Scenario Outline: I set Icon component theme to <theme>
    When I open default "Icon" component in noIFrame with "themeNames" json from "themes" using "<nameOfObject>" object name
    Then "icon" component css "background-color" is set to "<theme>" common
    Examples:
      | theme  | nameOfObject     |
      | mint   | iconThemeMint    |
      | aegean | iconThemeAegean  |
      | none   | iconThemeNone    |

  @positive
  Scenario Outline: I set Link component theme to <theme>
    When I open default "Link" component in noIFrame with "themeNames" json from "themes" using "<nameOfObject>" object name
    Then Link component css color is set to "<theme>"
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |

  @positive
  Scenario Outline: I set Loader component theme to <theme>
    When I open Test test_basic "Loader" component in noIFrame with "themeNames" json from "themes" using "<nameOfObject>" object name
    Then Loader component css background color is set to "<theme>"
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |

  @positive
  Scenario Outline: I set Multiaction Button component theme to <theme>
    When I open default "Multi action button" component in noIFrame with "themeNames" json from "themes" using "<nameOfObject>" object name
    Then "button" component css "color" is set to "<theme>" common
      And "button" component css "border-color" is set to "<theme>" common
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |

  @positive
  Scenario Outline: I set Pill component theme to <theme>
    When I open default "Pill" component in noIFrame with "themeNames" json from "themes" using "<nameOfObject>" object name
    Then "pill" component css "border-color" is set to "<theme>" common
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |

  @positive
  Scenario Outline: I set Show Edit Pod component theme to <theme>
    When I open default "Showeditpod" component in noIFrame with "themeNames" json from "themes" using "<nameOfObject>" object name
    Then Link component css color is set to "<theme>"
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |

  @positive
  Scenario Outline: I set Split Button component theme to <theme>
    When I open default "Split Button" component in noIFrame with "themeNames" json from "themes" using "<nameOfObject>" object name
    Then "button" component css "color" is set to "<theme>" common
      And "button" component css "border-color" is set to "<theme>" common
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |

  @positive
  Scenario Outline: I set Step Sequence component theme to <theme>
    When I open default "Step Sequence" component in noIFrame with "themeNames" json from "themes" using "<nameOfObject>" object name
    Then "step-sequence-item" component css "color" is set to "<theme>"
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |

  @positive
  Scenario Outline: I set Tabs component theme to <theme>
    When I open Test test_basic "Tabs" component in noIFrame with "themeNames" json from "themes" using "<nameOfObject>" object name
    Then "select-tab" element css "border-bottom-color" is set to "<theme>" common
    Examples:
      | theme  | nameOfObject |
      | mint   | themeMint    |
      | aegean | themeAegean  |
      | none   | themeNone    |
