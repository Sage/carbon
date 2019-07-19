Feature: Decimal component
  I want to change Decimal component properties

  # Added Experimental untill the component will be merged with master
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
    When I set label to "<label>"
      And I set labelHelp to "<label>"
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
  Scenario Outline: Change Decimal component label inline
    When I set label to "<label>"
      And I check labelInline checkbox
    Then label is set to inline
    Examples:
      | label                    |
      | Sample text              |

  @positive
  Scenario Outline: Change Decimal component label width to <width>
    When I set label to "<label>"
      And I set labelHelp to "<label>"
      And I check labelInline checkbox
      And I set label width slider to <width>
    Then label width on preview is <width>
    Examples:
      | label       | width |
      | Sample text |  0    |
      | Sample text |  10   |
      | Sample text |  50   |
      | Sample text |  100  |

  @positive
  Scenario Outline: Change Decimal component input width to <width>
    When I set label to "<label>"
      And I set labelHelp to "<label>"
      And I check labelInline checkbox
      And I set inputWidth slider to <width>
    Then inputWidth on preview is <width>
    Examples:
      | label                    | width |
      | Sample text              |  0    |
      | 1234567890               |  10   |
      | áéíóú¿¡üñ                |  50   |
      | !@#$%^*()_+-=~[];:.,?{}  |  100  |

  @positive
  Scenario Outline: Change Decimal component label align to <labelAlign>
    When I set label to "<label>"
      And I set labelHelp to "<label>"
      And I check labelInline checkbox
      And I select labelAlign to "<labelAlign>"
    Then label align on preview is set to "<labelAlign>"
    Examples:
      | label                    | labelAlign |
      | áéíóú¿¡üñ                |  left      |
      | 1234567890               |  right     |

  @positive
  Scenario Outline: Check Decimal component input field will not accept characters except numbers to <label>
    When I set label to "<label>"
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