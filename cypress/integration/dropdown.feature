# This componet will be depecated and replaced by Select,
# that's why not all cases are covered and common methods are not isolated.
Feature: Dropdown component
  I want to change Dropdown component properties

  Background: Open Dropdown component page
    Given I open "Dropdown" component page

  Scenario: Disable Dropdown
    When I disable Dropdown component
    Then Dropdown is disabled

  Scenario: Disable and enable Dropdown
    When I disable Dropdown component
      And I enable Dropdown component
    Then Dropdown is enabled

  Scenario: Dropdown is readOnly
    When I check readOnly
    Then Dropdown is readOnly

  Scenario: Dropdown is not readOnly
    When I check readOnly
      And I uncheck readOnly
    Then Dropdown is not readOnly

  Scenario Outline: Set Dropdown label
    When I set label to "<label>"
    Then Dropdown label is set to "<label>"
    Examples:
      | label                    |
      | Example text             |
      | áéíóú¿¡üñ                |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                 |
      | <>                       |

  Scenario Outline: Set Dropdown label help
    When I set label help to "<label>"
      And I hover mouse on help icon
    Then Label help on preview is set to "<label>"
    Examples:
      | label                    |
      | Example text             |
      | áéíóú¿¡üñ                |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario Outline: Change Dropdown input width
    When I set input width to "<width>"
    Then Input width is set to "<width>"
    Examples:
      | width |
      | 1     |
      | 10    |
      | 100   |

  @negative
  Scenario Outline: Set out of scope characters to Dropdown input width
    When I set input width to "<width>"
    Then Input width is not set
    Examples:
      | width                   |
      | !@#$%^*()_+-=~[];:.,?{} |
      | 汉字                      |
      | <>                      |

  @positive
  Scenario Outline: Change Dropdown component field help
    When I set field help to "<fieldHelp>"
    Then Field help on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp                |
      | Example Test             |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | áéíóú¿¡üñ                |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario Outline: Change Dropdown label align
    When I check label inline checkbox
      And I set label align "<direction>"
    Then direction on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |