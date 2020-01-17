Feature: Button component
  I want to check Button component properties

  Background: Open Button component page default
    Given I open "Button" component page

  @positive
  Scenario Outline: Set Button size to <size>
    When I select size to "<size>"
    Then Button height is "<height>" and width is "<width>"
    Examples:
      | size   | height | width       |
      | small  | 32px   | 136.4375px  |
      | medium | 40px   | 152.4375px  |
      | large  | 48px   | 182.78125px |

  @positive
  Scenario Outline: Set Button subtext to <subtext>
    When I select size to "large"
      And I set subtext to "<subtext>"
    Then Button subtext on preview is "<subtext>"
    Examples:
      | subtext                 |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Set Button Type as <buttonType>
    When I select buttonType to "<buttonType>"
    Then Button font color is "<font-color>"
      And Button background color is "<background>"
    Examples:
      | buttonType     | font-color         | background         |
      | primary        | rgb(255, 255, 255) | rgb(0, 128, 93)    |
      | secondary      | rgb(0, 128, 93)    | rgba(0, 0, 0, 0)   |
      | tertiary       | rgb(0, 128, 93)    | rgba(0, 0, 0, 0)   |
      | destructive    | rgb(255, 255, 255) | rgb(199, 56, 79)   |
      | darkBackground | rgb(0, 128, 93)    | rgb(255, 255, 255) |

  @positive
  Scenario Outline: Set Button component label to <label>
    When I set children to "<label>"
    Then Button label on preview is "<label>"
    Examples:
      | label                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario: Disable Button
    When I disable Button component
    Then Button is disabled

  @positive
  Scenario: Disable and enable Button
    When I disable Button component
      And I enable Button component
    Then Button is enabled

  @positive
  Scenario Outline: Change Button icon position to <iconPosition>
    When I check has icon checkbox
      And I select iconType to "add"
      And I select iconPosition to "<iconPosition>"
    Then Button icon position is set to "<iconPosition>"
    Examples:
      | iconPosition |
      | after        |
      | before       |

  @positive
  Scenario: Verify the click function for a Button component
    When clear all actions in Actions Tab
      And I click on "button"
    Then click action was called in Actions Tab