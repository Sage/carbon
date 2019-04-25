Feature: Button component
  I want to change Button label, theme, size and subtext properties

  Background: Open Button component page
    Given I open "Button" component page

  @positive
  Scenario Outline: Change Button component label
    When I set children to "<label>"
    Then Button label on preview is "<label>"
    Examples:
      | label                    |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario Outline: Change Button subtext
    When I set component size to "large"
      And I set component subtext to "<subtext>"
    Then Button subtext on preview is "<subtext>"
    Examples:
      | subtext                  |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @negative
  Scenario: I set space character to Button subtext
    When I set component size to "large"
      # I use space character below
      And I set component subtext to " "
    Then Button subtext on preview is " "

  @positive
  Scenario: I set component size to large but I leave Button subtext empty
    When I set component size to "large"
    # And I leave Button subtext empty
    Then Button subtext on preview is not visible

  @positive
  Scenario Outline: Change Button 'as' property
    When I set as property to "<as>"
    Then Button as property on preview is "<as>"
    Examples:
      | as        |
      | primary   |
      | secondary |

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
  Scenario Outline: Set Button size to small, medium and large
    When I set component size to "<size>"
    Then Button size property on preview is "<size>"
    Examples:
      | size   |
      | small  |
      | medium |
      | large  |

  @positive
  Scenario Outline: Set theme to Button
    When I set Button theme property to "<theme>"
    Then Button theme property on preview is "<theme>"
    Examples:
      | theme        |
      | blue         |
      | grey         |
      | magenta      |
      | magenta-dull |
      | red          |
      | white        |
