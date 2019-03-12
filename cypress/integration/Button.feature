Feature: Button component
  I want to change Button label, theme, size and subtext

  @positive
  Scenario Outline: Change Button component label
    Given I open Button component page
    When I set children to "<label>"
    Then Button label on preview is "<label>"
    Examples:
      | label                    |
      | First Label Test         |
      | Second label test        |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | 汉字                       |
      | <>                       |

  @positive
  Scenario Outline: Change button subtext
    Given I open Button component page
    When I set Component size to "large"
      And I set Component subtext to "<subtext>"
    Then Button subtext on preview is "<subtext>"
    Examples:
      | subtext                  |
      | example subtext          |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | 汉字                       |
      | <>                       |

  @positive
  Scenario Outline: Change Button 'as' property
    Given I open Button component page
    When I set as property to "<as>"
    Then Button as property on preview is "<as>"
    Examples:
      | as        |
      | primary   |
      | secondary |

  @positive
  Scenario: Disable Button
    Given I open Button component page
    When I disable Button
    Then Button is disabled

  @positive
  Scenario: Disable and enable Button
    Given I open Button component page
    When I disable Button
      And I enable Button
    Then Button is enabled

  @positive
  Scenario Outline: Set Button size to small, medium and large
    Given I open Button component page
    When I set Component size to "<size>"
    Then Button size property on preview is "<size>"
    Examples:
      | size   |
      | small  |
      | medium |
      | large  |

  @positive
  Scenario Outline: Set theme to Button
    Given I open Button component page
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


# these scenarios do not apply storybook
# @negative @ignore
# Scenario Outline: Set Button size to non-existent
#   Given I open Button component page
#   When I type "<size>" to Button size
#   Then I see "No results match" "<size>" for results
#   Examples:
#     | size                          |
#     | 1!@#$%^&*()_+-=~[];'./?\,}:-> |
#     | non-existent                  |
#     | < {                           |
#     | 汉字                            |

# @negative @ignore
# Scenario Outline: Change Button 'as' property to non-existent
#   Given I open Button component page
#   When I type "<as>" to as property
#   Then I see "No results match" "<as>" for results
#   Examples:
#     | as                            |
#     | 1!@#$%^&*()_+-=~[];'./?\,}:-> |
#     | non-existent                  |
#     | < {                           |
#     | 汉字                            |

# @negative @ignore
# Scenario Outline: Set theme to Button to non-existent
#   Given I open Button component page
#   When I type "<theme>" to Button theme property
#   Then I see "No results match" "<theme>" for results
#   Examples:
#     | theme                         |
#     | 1!@#$%^&*()_+-=~[];'./?\,}:-> |
#     | non-existent                  |
#     | < {                           |
#     | 汉字                            |
