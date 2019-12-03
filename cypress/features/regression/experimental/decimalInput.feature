Feature: Decimal component
  I want to change Decimal component properties

  Background: Open Decimal component page
    Given I open "Experimental-Decimal-Input" component page

  @positive
  Scenario Outline: Change Decimal component fieldHelp to <fieldHelp>
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
  Scenario Outline: Change Decimal component label to <label>
    When I set label to "<label>"
    Then label on preview is "<label>"
    Examples:
      | label                    |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario Outline: Change Decimal input align to the <direction>
    When I select align to "<direction>"
    Then input direction is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |

  @positive
  Scenario Outline: Change Decimal component label help to <label>
    Given I set label to "<label>"
      And I set labelHelp to "<label>"
    When I hover mouse onto help icon
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
  Scenario: Change Decimal component label inline
    When I set label to "label"
      And I check labelInline checkbox
    Then label is set to inline

  @positive
  Scenario Outline: Change Decimal component label width to <width>
    Given I set label to "label"
      And I set labelHelp to "label"
      And I check labelInline checkbox
    When I set label width slider to <width>
    Then label width on preview is <width>
    Examples:
      | width |
      |  0    |
      |  10   |
      |  50   |
      |  100  |

  @positive
  Scenario Outline: Change Decimal component input width to <width>
    Given I set label to "label"
      And I check labelInline checkbox
    When I set inputWidth slider to <width>
    Then inputWidth on preview is <width>
    Examples:
      | width |
      |  1    |
      |  10   |
      |  50   |
      |  100  |

  @positive
  Scenario Outline: Change Decimal component label align to <labelAlign>
    Given I set label to "label"
      And I check labelInline checkbox
    When I select labelAlign to "<labelAlign>"
    Then label align on preview is set to "<labelAlign>"
    Examples:
      | labelAlign |
      |  left      |
      |  right     |

  @positive
  Scenario Outline: Check Decimal component input field will not accept characters except numbers to <label>
    When I set Decimal input to "<label>"
    Then Decimal label is not set to "<label>"
    Examples:
      | label                    |
      | Sample text              |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario: Disable Decimal component
    When I disable Decimal component
    Then Decimal component is disabled

  @positive
  Scenario: Disable and enable Decimal component
    When I disable Decimal component
      And I enable Decimal component
    Then Decimal component is enabled

  @positive
  Scenario: Decimal component is readOnly
    When I check readOnly checkbox
    Then Decimal component is readOnly

  @positive
  Scenario: Decimal component is not readOnly
    When I check readOnly checkbox
      And I uncheck readOnly checkbox
    Then Decimal component is not readOnly