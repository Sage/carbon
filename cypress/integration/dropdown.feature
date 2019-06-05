# This componet will be depecated and replaced by Select,
# that's why not all cases are covered and common methods are not isolated.
Feature: Dropdown component
  I want to change Dropdown component properties

  Background: Open Dropdown component page
    Given I open "Dropdown" component page

  @positive
  Scenario: Disable Dropdown
    When I disable Dropdown component
    Then Dropdown is disabled

  @positive
  Scenario: Disable and enable Dropdown
    When I disable Dropdown component
      And I enable Dropdown component
    Then Dropdown is enabled

  @positive
  Scenario: Dropdown is readOnly
    When I check readOnly checkbox
    Then Dropdown is readOnly

  @positive
  Scenario: Dropdown is not readOnly
    When I check readOnly checkbox
      And I uncheck readOnly checkbox
    Then Dropdown is not readOnly

  @positive
  Scenario Outline: Set Dropdown label to <label>
    When I set label to "<label>"
    Then Dropdown label is set to "<label>"
    Examples:
      | label                    |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |
  
  @positive
  Scenario Outline: Set Dropdown label help to <label>
    When I set labelHelp to "<label>"
      And I hover mouse onto help icon
    Then tooltipPreview on preview is set to "<label>"
    Examples:
      | label                    |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario Outline: Change Dropdown input width
    When I set inputWidth to "<width>"
    Then inputWidth is set to "<width>"
    Examples:
      | width |
      | 1     |
      | 10    |
      | 100   |

  @negative
  Scenario Outline: Set out of scope characters to Dropdown input width
    When I set inputWidth to "<width>"
    Then inputWidth is not set
    Examples:
      | width                   |
      | !@#$%^*()_+-=~[];:.,?{} |
      | 汉字                     |
      | <>                      |

  @positive
  Scenario Outline: Change Dropdown component field help to <fieldHelp>
    When I set fieldHelp to "<fieldHelp>"
    Then fieldHelp on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp                |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario Outline: Change Dropdown label align
    When I check labelInline checkbox
      And I select labelAlign to "<direction>"
    Then labelAlign on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |