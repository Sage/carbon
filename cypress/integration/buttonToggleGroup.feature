Feature: Button Toggle Group component
  I want to change Button Toggle Group label, help label, input width, field help properties

  Background: Open Button Toggle Group component page
    Given I open "Button Toggle Group" component page

  @positive
  Scenario Outline: Change Button Toggle Group component label
    When I set label to "<label>"
    Then label on preview is "<label>"
    Examples:
      | label                    |
      | ÄÖÜßäöü                  |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | áéíóú¿¡üñ                |
      | <>                       |

  @positive
  Scenario Outline: Change Button Toggle Group component label help
    When I set label help to "<labelHelp>"
      And I hover mouse on help icon
    Then Label help on preview is set to "<labelHelp>"
    Examples:
      | labelHelp                |
      | ÄÖÜßäöü                  |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | áéíóú¿¡üñ                |
      | <>                       |

  @positive
  Scenario Outline: Change Button Toggle Group input width
    When I set input width to "<width>"
    Then Input width is set to "<width>"
    Examples:
      | width |
      | 1     |
      | 10    |
      | 100   |

  @negative
  Scenario Outline: Set out of scope characters to Button Toggle Group input width
    When I set input width to "<width>"
    Then Input width is not set
    Examples:
      | width                   |
      | !@#$%^*()_+-=~[];:.,?{} |
      | 汉字                      |
      | <>                      |

  @positive
  Scenario Outline: Change Button Toggle Group component field help
    When I set field help to "<fieldHelp>"
    Then Field help on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp                |
      | ÄÖÜßäöü                  |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | áéíóú¿¡üñ                |
      | <>                       |

  @positive
  Scenario: Enable label inline checkbox
    When I check label inline checkbox
    Then Button Toggle Group component has label-inline property

  @positive
  Scenario: Enable and disable label inline checkbox
    When I check label inline checkbox
      And I uncheck label inline checkbox
    Then Button Toggle Group component do not have label-inline property

  @positive
  Scenario Outline: Change Button Toggle Group label width
    When I check label inline checkbox
      And I set label width to "<width>"
    Then Label width is set to "<width>"
    Examples:
      | width |
      | 1     |
      | 10    |
      | 100   |

  @negative
  Scenario Outline: Set out of scope characters to Button Toggle Group input width
    When I set input width to "<width>"
    Then Label width is not set
    Examples:
      | width                   |
      | !@#$%^*()_+-=~[];:.,?{} |
      | 汉字                      |
      | <>                      |

  @positive
  Scenario Outline: Change Toggle Button Group label align
    When I check label inline checkbox
      And I set label align "<direction>"
    Then direction on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |
