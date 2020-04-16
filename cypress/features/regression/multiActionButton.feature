Feature: Multi Action Button default component
  I want to test Multi Action Button default component properties

  Background: Open Multi Action Button default component page
    Given I open "Multi Action Button" component page

  @positive
  Scenario Outline: Change Multi Action Button text to <text>
    When I set text to "<text>"
    Then Multi Action Button text on preview is set to "<text>"
    Examples:
      | text                    |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Change buttonType property of Multi Action Button component to <buttonType>
    When I select buttonType to "<buttonType>"
    Then Multi Action Button has "<background-color>" background-color
      And Multi Action Button border color is "<border-color>" border-color
    Examples:
      | buttonType | background-color | border-color     |
      | primary    | rgb(0, 128, 93)  | rgba(0, 0, 0, 0) |
      | secondary  | rgba(0, 0, 0, 0) | rgb(0, 128, 93)  |

  @positive
  Scenario Outline: Set Multi Action Button size to <size>
    When I select size to "<size>"
    Then Multi Action Button height is "<height>"
    Examples:
      | size   | height |
      | small  | 32     |
      | medium | 40     |
      | large  | 48     |

  @positive
  Scenario Outline: Check <align> property of Multi Action Button component
    When I select align to "<align>"
      And I hover on Multi Action Button
    Then Multi Action Button align on preview is "<align>"
    Examples:
      | align |
      | left  |
      | right |

  @positive
  Scenario: Disabled Multi Action Button component
    When I disable MultiActionButton component
    Then Multi Action Button state is disabled

  @positive
  Scenario: Disabled and enabled Multi Action Button component
    Given  I disable MultiActionButton component
    When I enable MultiActionButton component
    Then Multi Action Button state is not disabled

  @positive
  Scenario Outline: Set Multi Action Button subtext to <subtext>
    Given I select size to "large"
    When I set subtext to "<subtext>"
    Then Multi Action Button subtext on preview is "<subtext>"
    Examples:
      | subtext                 |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario: Invoking Multi Action Button component
    When I hover on Multi Action Button
    Then Multi Action Button is expanded and contains three items

  @positive
  Scenario: Check click event
    Given clear all actions in Actions Tab
    When I click on "button"
    Then click action was called in Actions Tab

  @positive
  Scenario Outline: Verify that the Multi Action Button has golden border
    When I hit Tab key 1 times
    Then Multi Action Button has golden border color

  @positive
  Scenario: Verify background-color after hovering
    When I hover on Multi Action Button
    Then Multi Action Button has "rgb(0, 96, 69)" background-color