Feature: Button component
  I want to check Button component properties

  Background: Open Button component default page
    Given I open "Design System Button Test" component page "knobs"

  @positive
  Scenario Outline: Set Button subtext to <subtext>
    Given I select size to "large"
    When I set subtext to <subtext> word
    Then Button subtext on preview is <subtext>
    Examples:
      | subtext                 |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario Outline: Set Button component label to <label>
    When I set children to <label> word
    Then Button label on preview is <label>
    Examples:
      | label                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario: Disable and enable Button
    Given I disable Button component
    When I enable Button component
    Then Button is enabled

  @positive
  Scenario: Verify the click function for a Button component
    Given clear all actions in Actions Tab
    When I click on "button"
    Then click action was called in Actions Tab