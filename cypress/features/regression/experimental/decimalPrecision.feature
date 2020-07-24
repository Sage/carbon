Feature: Decimal component - precision
  I want to check Decimal component precision propertiy

  @positive
  Scenario Outline: Check Decimal component input field with precision <precision> and input <labelInput>
    Given I open default "Experimental-Decimal-Input" component in noIFrame with "decimal" json from "experimental" using "<nameOfObject>" object name
    When I set Decimal input to <labelInput>
    Then Decimal Input is set to <fieldHelpOutput>
    Examples:
      | labelInput         | nameOfObject | fieldHelpOutput   |
      | 150                | precision0   | 150               |
      | 1234567890.5       | precision1   | 1234567890.5      |
      | 0.12               | precision2   | 0.12              |
      | 0.123              | precision3   | 0.123             |
      | 111.9090           | precision4   | 111.9090          |
      | 1.00001            | precision5   | 1.00001           |
      | 1.000075           | precision6   | 1.000075          |
      | 1553.1400013       | precision7   | 1553.1400013      |
      | 150.90909090       | precision8   | 150.90909090      |
      | 1234.517567891     | precision9   | 1234.517567891    |
      | 1.0000000001       | precision10  | 1.0000000001      |
      | 1.00000000012      | precision11  | 1.00000000012     |
      | 1234.517567891111  | precision12  | 1234.517567891111 |
      | 7.5175678911113    | precision13  | 7.5175678911113   |
      | 17.51756789111139  | precision14  | 17.51756789111139 |
      | 9.517567891111398  | precision15  | 9.517567891111398 |
      | 17.517567891111390 | precision15  | 17.51756789111139 |
      | 150.091            | precision0   | 150               |
      | 0.12114            | precision2   | 0.12              |
      | 0.1234             | precision3   | 0.123             |
      | 111.90909090       | precision4   | 111.9090          |
      | 1.000090000000001  | precision5   | 1.00009           |
      | 1.000077000000015  | precision6   | 1.000077          |
      | 1553.1400110       | precision7   | 1553.140011       |
      | 150.9090909011     | precision8   | 150.90909090      |
      | 1234.51756789199   | precision9   | 1234.517567891    |
      | 1.00000000011445   | precision10  | 1.0000000001      |
      | 1.000000000129999  | precision11  | 1.00000000012     |
      | 1234.5175678911199 | precision12  | 1234.517567891119 |
      | 7.5175678911       | precision13  | 7.5175678911      |
      | 1.517567891111399  | precision14  | 1.51756789111139  |
      | 9.5175678911113981 | precision15  | 9.517567891111398 |