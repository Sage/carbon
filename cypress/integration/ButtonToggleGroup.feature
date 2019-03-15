Feature: Button Toggle Group component
  I want to change Button Toggle Group label, help label, input width, field help

  @positive
  Scenario Outline: Change Button Toggle Group component label
    Given I open Button Toggle Group component page
    When I set label to "<label>"
    Then Label on preview is "<label>"
    Examples:
      | label                    |
      | Example Test             |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | 汉字                       |
      | <>                       |

  @positive
  Scenario Outline: Change Button Toggle Group component label help
    Given I open Button Toggle Group component page
    When I set label help to "<labelHelp>"
      And I hover mouse on help icon
    Then Label help on preview is set to "<labelHelp>"
    Examples:
      | labelHelp                |
      | Example Test             |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | 汉字                       |
      | <>                       |

  @positive
  Scenario Outline: Change Button Toggle Group input width
    Given I open Button Toggle Group component page
    When I set input width to "<width>"
    Then Width is set to "<width>"
    Examples:
      | width |
      | 1     |
      | 10    |
      | 100   |

  @negative
  Scenario Outline: Set out of scope characters to Button Toggle Group input width
    Given I open Button Toggle Group component page
    When I set input width to "<width>"
    Then Width is not set
    Examples:
      | width                   |
      | !@#$%^*()_+-=~[];:.,?{} |
      | 汉字                      |
      | <>                      |

  @positive
  Scenario Outline: Change Button Toggle Group component field help
    Given I open Button Toggle Group component page
    When I set field help to "<fieldHelp>"
    Then Field help on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp                |
      | Example Test             |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | 汉字                       |
      | <>                       |

  @positive
  Scenario: Enable label inline checkbox
    Given I open Button Toggle Group component page
    When I check label inline checkbox
    Then Button Toggle Group component has label-inline property

  @positive
  Scenario: Enable and disable label inline checkbox
    Given I open Button Toggle Group component page
    When I check label inline checkbox
      And I uncheck label inline checkbox
    Then Button Toggle Group component do not have label-inline property

  @positive
  Scenario Outline: Change Toggle Button Group label align
    Given I open Button Toggle Group component page
    When I check label inline checkbox
      And I set label align "<direction>"
    Then Button Toggle Group direction on preview is "<direction>"
    Examples:
      | direction |
    # | left      |
      | right |
