Feature: Button component

  I want to change Button component label

  Scenario Outline: Change Button component label
    Given I open Button component page
    When I set children to "<label>"
    Then Button label on preview is "<label>"
    Examples:
      | label             |
      | First Label Test  |
      | Second label test |
      | !@#$%^&*()        |

  Scenario Outline: Change button subtext
    Given I open Button component page
    When I set Button subtext to "<subtext>"
      And I set size to "large"
    Then Button subtext on preview is "<subtext>"
    Examples:
      | subtext         |
      | example subtext |

