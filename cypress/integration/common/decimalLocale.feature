Feature: Decimal component - locale
  I want to test Decimal component locale properties

  @positive
  Scenario Outline: Check Decimal component input field with <nameOfObject> and input <labelInput>
    Given I open locale "Decimal Input Test" component with "decimal" json from "commonComponents" using "<nameOfObject>" object name
    When I set Decimal input to the "<labelInput>"
    Then Decimal Input is set to "<output>"
    Examples:
      | nameOfObject | labelInput      | output          |
      | localeEN     | 1,1,1,1,1.1     | 11,111.100      |
      | localeEN     | 1,1,1222,12,1.1 | 111,222,121.100 |
      | localeEN     | 1,,1,,1         | 1,,1,,1         |
      | localeES     | 1.1.1.1.1.1,1   | 111.111,100     |
      | localeES     | 2.123           | 2123,000        |
      | localeES     | 21.21.111.1,013 | 21.211.111,013  |
      | localeES     | 2.,12.,1        | 2.,12.,1        |
      | localeFR     | 11111,25        | 11 111,250      |
      | localePT     | 1111,2          | 1111,200        |
      | localeNO     | 1 1 11,21       | 1 111,210       |

  @negative
  Scenario: Check Decimal component input field with localeFR object and input 1  1  1  1  1,25
    Given I open locale "Decimal Input Test" component with "decimal" json from "commonComponents" using "localeFR" object name
    When I set Decimal input to the "1  1  1  1  1,25"
    Then Decimal Input is set to "1  1  1  1  1,25"

  @positive
  Scenario: Check Decimal component input field with localePT locale and input 111 11,25
    Given I open locale "Decimal Input Test" component with "decimal" json from "commonComponents" using "localePT" object name
    When I set Decimal input to the "111 11,25"
    Then Decimal Input is set to "11 111,250"

  @positive
  Scenario: Check Decimal component input field with localeNO locale and input 111 11,25
    Given I open locale "Decimal Input Test" component with "decimal" json from "commonComponents" using "localeNO" object name
    When I set Decimal input to the "111 1 1,25"
    Then Decimal Input is set to "11 111,250"

  @negative
  Scenario: Check Decimal component input field with localeNO object and input 1  1  1  1  1,25
    Given I open locale "Decimal Input Test" component with "decimal" json from "commonComponents" using "localeNO" object name
    When I set Decimal input to the "1  1  1  1  1,25"
    Then Decimal Input is set to "1  1  1  1  1,25"