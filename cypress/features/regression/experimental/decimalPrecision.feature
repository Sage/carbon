Feature: Decimal component
  I want to change Decimal component properties

  Background: Open Decimal component page
    Given I open "Experimental-Decimal-Input" component page

 @positive
  Scenario Outline: Check Decimal component input field with precision <precision> and input <labelInput>
    When I set input precision slider to <precision>
      And I wait 500
      And I set Decimal input to "<labelInput>"
    Then input precision slider is set to <precision>
      And Decimal Input is set to "<fieldHelpOutput>"
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