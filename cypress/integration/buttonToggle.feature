Feature: Button Toggle component
  I want to change Button Toggle children, button icon, button size, disabled, grouped properties

  Background: Open Button Toggle component page
    Given I open "Button Toggle" component page

  @positive
  Scenario Outline: Change Button Toggle childen
    When I set children to "<label>"
    Then Button Toggle label on preview is "<label>"
    Examples:
      | label                    |
      | ÄÖÜßäöü                  |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | áéíóú¿¡üñ                |
      | <>                       |

  @positive
  Scenario Outline: Change button icon size property
    When I set button icon to "arrow_left"
      And I set button icon size to "<size>"
    Then Button icon size on preview is "<size>"
    Examples:
      | size  |
      | small |
      | large |

  @positive
  Scenario Outline: Set Button Toggle size to small, large
    When I set component size to "<size>"
    Then Button Toggle size on preview is "<size>"
    Examples:
      | size  |
      | small |
      | large |

  @positive
  Scenario: Disable Button
    When I disable Button
    Then Button Toggle is disabled

  @positive
  Scenario: Disable and enable Button
    When I disable Button
      And I enable Button
    Then Button Toggle is enabled

  @positive
  Scenario: Enable Button Toggle grouped property
    When I check grouped
    Then Button Toggle is grouped

  @positive
  Scenario: Enable and disable Button Toggle grouped property
    When I disable Button
      And I enable Button
    Then Button Toggle is not grouped
