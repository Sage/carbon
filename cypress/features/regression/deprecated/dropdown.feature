# This componet is deprecated and will be replaced by Select,
# that's why not all cases are covered and common methods are not isolated.
Feature: Deprecated Dropdown component
  I want to change deprecated Dropdown component properties

  Background: Open deprecated Dropdown component page
    Given I open deprecated "Dropdown" component page

  @positive
  @deprecated
  Scenario: Disable Dropdown
    When I disable Dropdown component
    Then Dropdown is disabled

  @positive
  @deprecated
  Scenario: Disable and enable Dropdown
    When I disable Dropdown component
      And I enable Dropdown component
    Then Dropdown is enabled

  @positive
  @deprecated
  Scenario: Dropdown is readOnly
    When I check readOnly checkbox
    Then Dropdown is readOnly

  @positive
  @deprecated
  Scenario: Dropdown is not readOnly
    When I check readOnly checkbox
      And I uncheck readOnly checkbox
    Then Dropdown is not readOnly

  @positive
  @deprecated
  Scenario Outline: Set Dropdown label to <label>
    When I set label to "<label>"
    Then Dropdown label is set to "<label>"
    Examples:
      | label                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  @deprecated
  Scenario Outline: Set Dropdown label help to <label>
    When I set labelHelp to "<label>"
      And I hover mouse onto help icon
    Then tooltipPreview on preview is set to "<label>"
    Examples:
      | label                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  @deprecated
  Scenario Outline: Change Dropdown input width to <width>
    When I set inputWidth to "<width>"
    Then inputWidth is set to "<width>"
    Examples:
      | width |
      | 1     |
      | 10    |
      | 100   |

  @negative
  @deprecated
  Scenario Outline: Set out of scope characters to Dropdown input width to <width>
    When I set inputWidth to "<width>"
    Then inputWidth is not set
    Examples:
      | width                   |
      | !@#$%^*()_+-=~[];:.,?{} |
      | 汉字                    |
      | <>                      |

  @positive
  @deprecated
  Scenario Outline: Change Dropdown component field help to <fieldHelp>
    When I set fieldHelp to "<fieldHelp>"
    Then fieldHelp on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp               |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  @deprecated
  Scenario Outline: Change Dropdown label align to <direction>
    When I check labelInline checkbox
      And I select labelAlign to "<direction>"
    Then labelAlign on preview is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |