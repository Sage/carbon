Feature: Button component
  I want to check Button component properties

  Background: Open Button component default page
    Given I open "Button" component page knobs

  @positive
  Scenario Outline: Set Button size to <size>
    When I select size to "<size>"
    Then Button height is "<height>"
    Examples:
      | size   | height |
      | small  | 32     |
      | medium | 40     |
      | large  | 48     |

  @positive
  Scenario Outline: Set Button subtext to <subtext>
    Given I select size to "large"
    When I set subtext to "<subtext>"
    Then Button subtext on preview is "<subtext>"
    Examples:
      | subtext                 |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Set Button Type as <buttonType>
    When I select buttonType to "<buttonType>"
    Then Button font color is "<font-color>"
      And Button background color is "<background-color>"
    Examples:
      | buttonType     | font-color         | background-color   |
      | primary        | rgb(255, 255, 255) | rgb(0, 128, 93)    |
      | secondary      | rgb(0, 128, 93)    | rgba(0, 0, 0, 0)   |
      | tertiary       | rgb(0, 128, 93)    | rgba(0, 0, 0, 0)   |
      | darkBackground | rgb(0, 128, 93)    | rgb(255, 255, 255) |

  @positive
  Scenario Outline: Set Button component label to <label>
    When I set children to "<label>"
    Then Button label on preview is "<label>"
    Examples:
      | label                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario: Disable Button
    When I disable Button component
    Then Button is disabled

  @positive
  Scenario: Disable and enable Button
    Given I disable Button component
    When I enable Button component
    Then Button is enabled

  @positive
  Scenario Outline: Change Button icon position to <iconPosition>
    Given I check has icon checkbox
      And I select iconType to "add"
    When I select iconPosition to "<iconPosition>"
    Then Button icon position is set to "<iconPosition>"
    Examples:
      | iconPosition |
      | after        |
      | before       |

  @positive
  Scenario: Verify the click function for a Button component
    Given clear all actions in Actions Tab
    When I click on "button"
    Then click action was called in Actions Tab

  @positive
  Scenario: Set Button icon to arrow_left_small
    Given I check has icon checkbox
    When I select iconType to "arrow_left_small"
    Then Button icon is set to "arrow_left_small"