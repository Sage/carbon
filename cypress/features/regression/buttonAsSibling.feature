Feature: Button as a sibling component
  I want to check Button as a sibling component properties

  Background: Open Button as a sibling component default page
    Given I open "Button" component page as sibling in no iframe

  @positive
  Scenario Outline: Set Button as a sibling size to <size>
    When I select size to "<size>"
    Then Button as a sibling height is "<height>"
    Examples:
      | size   | height |
      | small  | 32     |
      | medium | 40     |
      | large  | 48     |

  @positive
  Scenario Outline: Set Button subtext to <subtext>
    Given I select size to "large"
    When I set subtext to "<subtext>"
    Then Button as a sibling subtext on preview is "<subtext>"
    Examples:
      | subtext                 |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Set Button as a sibling Type as <buttonType>
    When I select buttonType to "<buttonType>"
    Then Button font color is "<font-color>"
      And Button as a sibling background color is "<background>"
    Examples:
      | buttonType     | font-color         | background         |
      | primary        | rgb(255, 255, 255) | rgb(0, 128, 93)    |
      | secondary      | rgb(0, 128, 93)    | rgba(0, 0, 0, 0)   |
      | tertiary       | rgb(0, 128, 93)    | rgba(0, 0, 0, 0)   |
      | darkBackground | rgb(0, 128, 93)    | rgb(255, 255, 255) |

  @positive
  Scenario Outline: Set Button as a sibling component label to <label>
    When I set children to "<label>"
    Then Button as a sibling label on preview is "<label>"
    Examples:
      | label                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario: Disable Button as a sibling
    When I disable Button component
    Then Button as a sibling is disabled

  @positive
  Scenario: Disable and enable Button as a sibling
    Given I disable Button component
    When I enable Button component
    Then Button as a sibling is enabled

  @positive
  Scenario Outline: Change Button icon position to <iconPosition>
    Given I check has icon checkbox
      And I select iconType to "add"
    When I select iconPosition to "<iconPosition>"
    Then Button as a sibling icon position is set to "<iconPosition>"
    Examples:
      | iconPosition |
      | after        |
      | before       |

  @positive
  Scenario: Verify the click function for a Button component
    Given clear all actions in Actions Tab
    When I click on "button" as a sibling
    Then click action was called in Actions Tab

  @positive
  Scenario: Set Button icon to alert
    Given I check has icon checkbox
    When I select iconType to "alert"
    Then Button as a sibling icon is set to "alert"