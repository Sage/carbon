Feature: Decimal component
  I want to change Decimal component properties

  # Added Experimental untill the component will be merged with master
  Background: Open Decimal component page
    Given I open "Experimental-Decimal" component page

  @positive
  Scenario Outline: Change Decimal component fieldHelp
    When I set field help to "<fieldHelp>"
    Then Field help on preview is set to "<fieldHelp>"
    Examples:
      | fieldHelp                    |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario Outline: Change Decimal component label
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
  Scenario Outline: Change Decimal input align
    When I set input align "<direction>"
    Then input direction is "<direction>"
    Examples:
      | direction |
      | left      |
      | right     |

  @positive
  Scenario Outline: Change Decimal component label help
    When I set label to "<label>"
      And I set label help to "<label>"
      And I hover mouse onto help icon
    Then Label help on preview is set to "<label>"
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
      And I check label inline checkbox
    Then label is set to inline
    Examples:
      | label                    |
      | Sample text              |

  @positive
  Scenario Outline: Change Decimal component label width
    When I set label to "<label>"
      And I set label help to "<label>"
      And I check label inline checkbox
      And I set label width slider to <width>
    Then label width on preview is <width>
    Examples:
      | label       | width |
      | Sample text |  0    |
      | Sample text |  10   |
      | Sample text |  50   |
      | Sample text |  100  |

  @positive
  Scenario Outline: Change Decimal component input width
    When I set label to "<label>"
      And I set label help to "<label>"
      And I check label inline checkbox
      And I set input width slider to <width>
    Then input width on preview is <width>
    Examples:
      | label                    | width |
      | Sample text              |  0    |
      | 1234567890               |  10   |
      | áéíóú¿¡üñ                |  50   |
      | !@#$%^*()_+-=~[];:.,?{}  |  100  |

  @positive
  Scenario Outline: Change Decimal component label align
    When I set label to "<label>"
      And I set label help to "<label>"
      And I check label inline checkbox
      And I set label align "<labelAlign>"
    Then label align on preview is set to "<labelAlign>"
    Examples:
      | label                    | labelAlign |
      | áéíóú¿¡üñ                |  left      |
      | 1234567890               |  right     |

  @positive
  Scenario Outline: Check Decimal component input field with different precision
    When I set input precision slider to <precision>
      And I set labelInput to "<labelInput>"
    Then input precision slider is set to <precision>
      And Decimal labelInput is set to "<fieldHelpOutput>"
    Examples:
      | labelInput        | precision | fieldHelpOutput   |
      | 150               |  0        | 150               |
      | 1234567890.5      |  1        | 1234567890.5      |
      | 0.12              |  2        | 0.12              |
      | 0.123             |  3        | 0.123             |
      | 111.9090          |  4        | 111.9090          |
      | 1.00001           |  5        | 1.00001           |
      | 1.000075          |  6        | 1.000075          |
      | 1553.1400013      |  7        | 1553.1400013      |
      | 150.90909090      |  8        | 150.90909090      |
      | 1234.517567891    |  9        | 1234.517567891    |
      | 1.0000000001      |  10       | 1.0000000001      |
      | 1.00000000012     |  11       | 1.00000000012     |
      | 1234.517567891111 |  12       | 1234.517567891111 |
      | 7.5175678911113   |  13       | 7.5175678911113   |
      | 17.51756789111139 |  14       | 17.51756789111139 |
      | 9.517567891111398 |  15       | 9.517567891111398 |
      | 17.517567891111390|  15       | 17.51756789111139 |
      | 150.091           |  0        | 150               |
      | 1234567890.5      |  1        | 1234567890.5      |
      | 0.12114           |  2        | 0.12              |
      | 0.1234            |  3        | 0.123             |
      | 111.90909090      |  4        | 111.9090          |
      | 1.000090000000001 |  5        | 1.00009           |
      | 1.000077000000015 |  6        | 1.000077          |
      | 1553.1400110      |  7        | 1553.140011       |
      | 150.9090909011    |  8        | 150.90909090      |
      | 1234.51756789199  |  9        | 1234.517567891    |
      | 1.00000000011445  |  10       | 1.0000000001      |
      | 1.000000000129999 |  11       | 1.00000000012     |
      | 1234.5175678911199|  12       | 1234.517567891119 |
      | 7.5175678911      |  13       | 7.5175678911      |
      | 1.517567891111399 |  14       | 1.51756789111139  |
      | 9.5175678911113981|  15       | 9.517567891111398 |

  @negative
  Scenario Outline: Check Decimal component input field will not accept characters except numbers
    When I set labelInput to "<labelInput>"
    Then Decimal labelInput is not set to "<labelInput>"
    Examples:
      | labelInput               |
      | Sample text              |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @negative
  Scenario: Disable Decimal component
    When I disable Decimal component
    Then Decimal component is disabled

  @positive
  Scenario: Disable and enable Decimal component
    When I disable Decimal component
      And I enable Decimal component
    Then Decimal component is enabled

  Scenario: Decimal component is readOnly
    When I check readOnly
    Then Decimal component is readOnly

  Scenario: Decimal component is not readOnly
    When I check readOnly
      And I uncheck readOnly
    Then Decimal component is not readOnly
