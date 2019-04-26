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

  # @positive
  # Scenario Outline: Change Decimal component label inline
  #   When I set label to "<label>"
  #     And I check label inline checkbox
  # #  Then Label help on preview is set to "<label>"
  #   Examples:
  #     | label                    |
  #     | Sample text              |
  #     | 1234567890               |
  #     | áéíóú¿¡üñ                |
  #     | !@#$%^*()_+-=~[];:.,?{}  |
  #     | ÄÖÜßäöüß                 |
  #     | <>                       |

  @positive
  Scenario Outline: Change Decimal component label width
    When I set label to "<label>"
      And I set label help to "<label>"
      And I check label inline checkbox
      And I set label width slider to <width>
    Then labelWidth on preview is <width>
    Examples:
      | label                    | width |
      | Sample text              |  0    |
      | 1234567890               |  10   |
      | áéíóú¿¡üñ                |  50   |
      | !@#$%^*()_+-=~[];:.,?{}  |  100  |

  @positive
  Scenario Outline: Change Decimal component input width
    When I set label to "<label>"
      And I set label help to "<label>"
      And I check label inline checkbox
      And I set input width slider to <width>
    Then inputWidth on preview is <width>
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
    Then labelAlign on preview is set to "<labelAlign>"
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
      | 1234567890.517    |  3        | 1234567890.517    |
      | 0.1234            |  4        | 0.1234            |
      | 0.1234            |  1        | 0.1               |
      | 111.90909090      |  8        | 111.90909090      |
      | 1.000000000000001 |  15       | 1.000000000000001 |
      | 1.000070000000015 |  5        | 1.00007           |
      | 1553.1400         |  3        | 1553.140          |

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

  # @negative
  # Scenario: Disable Decimal component
  #   When I disable Decimal component
  #   Then Decimal component is disabled

  # @positive
  # Scenario: Disable and enable Decimal component
  #   When I disable Decimal component
  #     And I enable Decimal component
  #   Then Decimal component is enabled

  # Scenario: Decimal component is readOnly
  #   When I check readOnly
  #   Then Decimal component is readOnly

  # Scenario: Decimal component is not readOnly
  #   When I check readOnly
  #     And I uncheck readOnly
  #   Then Decimal component is not readOnly
