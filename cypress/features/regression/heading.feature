Feature: Heading component
  I want to change Heading component properties

  Background: Open Heading component page
    Given I open "Heading" component page

  @positive
  Scenario Outline: Change heading title to <title>
    When I set title to "<title>"
    Then heading title is set to "<title>"
    Examples:
      | title                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Change children to <children>
    When I set children to "<children>"
    Then heading children on preview is "<children>"
    Examples:
      | children                |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Change subheader to <subheader>
    When I set subheader to "<subheader>"
    Then subheader on preview is "<subheader>"
    Examples:
      | subheader               |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Change help to <help>
    When I set help to "<help>"
      And I hover mouse onto help icon
    Then tooltipPreview on preview is set to "<help>"
    Examples:
      | help                    |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Change helpLink to <helpLink>
    When I set helpLink to "<helpLink>"
    Then link on preview is "<helpLink>"
    Examples:
      | helpLink                |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Change backLink to <backLink>
    When I set backLink to "<backLink>"
    Then backLink on preview is "<backLink>"
    Examples:
      | backLink                |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario: Check divider
    Given I uncheck divider checkbox
    When I check divider checkbox
    Then Heading divider is visible

  @positive
  Scenario: Uncheck divider
    When I uncheck divider checkbox
    Then divider is not visible

  @positive
  Scenario: Check separator
    When I check separator checkbox
    Then separator is visible

  @positive
  Scenario: Uncheck separator
    Given I check separator checkbox
    When I uncheck separator checkbox
    Then separator is not visible