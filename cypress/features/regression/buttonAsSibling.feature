Feature: Button as a sibling component
  I want to check Button as a sibling component properties

  Background: Open Button as a sibling component page default
    Given I open "Button" component page as sibling in no iframe

  @positive
  Scenario Outline: Set Button as a siblig size to <size>
    When I select size to "<size>"
    Then Button as a sibling height is "<height>" and width is "<width>"
    Examples:
      | size   | height | width       |
      | small  | 32px   | 136.4375px  |
      | medium | 40px   | 152.4375px  |
      | large  | 48px   | 182.78125px |

  @positive
  Scenario Outline: Set Button subtext to <subtext>
    When I select size to "large"
      And I set subtext to "<subtext>"
    Then Button as a sibling subtext on preview is "<subtext>"
    Examples:
      | subtext                 |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <>                      |

  @positive
  Scenario Outline: Set Button as a siblig Type as <buttonType>
    When I select buttonType to "<buttonType>"
    Then Button font color is "<font-color>"
      And Button as a sibling background color is "<background>"
    Examples:
      | buttonType     | font-color         | background         |
      | primary        | rgb(255, 255, 255) | rgb(0, 128, 93)    |
      | secondary      | rgb(0, 128, 93)    | rgba(0, 0, 0, 0)   |
      | tertiary       | rgb(0, 128, 93)    | rgba(0, 0, 0, 0)   |
      | destructive    | rgb(255, 255, 255) | rgb(199, 56, 79)   |
      | darkBackground | rgb(0, 128, 93)    | rgb(255, 255, 255) |

  @positive
  Scenario Outline: Set Button as a siblig component label to <label>
    When I set children to "<label>"
    Then Button as a sibling label on preview is "<label>"
    Examples:
      | label                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <>                      |

  @positive
  Scenario: Disable Button
    When I disable Button component
    Then Button as a siblig is disabled

  @positive
  Scenario: Disable and enable Button
    When I disable Button component
      And I enable Button component
    Then Button as a sibling is enabled

  @positive
  Scenario Outline: Change Button icon position to <iconPosition>
    When I check has icon checkbox
      And I select iconType to "add"
      And I select iconPosition to "<iconPosition>"
    Then Button as a sibling icon position is set to "<iconPosition>"
    Examples:
      | iconPosition |
      | after        |
      | before       |

  @positive
  Scenario: Verify the click function for a Button component
    When clear all actions in Actions Tab
      And I click on "button" as a sibling
    Then click action was called in Actions Tab