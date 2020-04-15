Feature: Popover container component
  I want to change Popover container component properties

  Background: Open Popover container component page
    Given I open basic Test "Popover container" component page
      And I open popover container

  @positive
  Scenario: Popover container is opened
    # commented because of BDD default scenario Given - When - Then
    # When I open popover container
    Then Popover container is visible

  @positive
  Scenario Outline: Change Popover container component title to <title>
    When I set title to "<title>"
    Then Popover title on preview is set to "<title>"
    Examples:
      | title                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario: Popover container component iconType to add
    When I select iconType to "add"
    Then icon on preview is "add"

  @positive
  Scenario Outline: Popover container component position to <position>
    When I select position to "<position>"
    Then Popover component opened the "<position>" side
    Examples:
      | position |
      | left     |
      | right    |

  @positive
  Scenario: Popover container is closed
    When I click popover close icon
    Then Popover container is not visible

  @positive
  Scenario Outline: Popover container is opened using <key> key
    Given I click popover close icon
    When I click onto popover setting icon using "<key>" key
    Then Popover container is visible
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario Outline: Popover container is closed using <key> key
    When I press onto closeIcon using "<key>" key
    Then Popover container is not visible
    Examples:
      | key   |
      | Enter |
      | Space |