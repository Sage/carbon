Feature: Decimal component - precision
  I want to check Decimal component precision propertiy

  @positive
  Scenario Outline: Check Decimal component input field with <nameOfObject> and input <labelInput>
    Given I open default "Decimal Input Test" component with "decimal" json from "commonComponents" using "<nameOfObject>" object name
    When I set Decimal input to the "<labelInput>"
    Then Decimal Input is set to "<output>"
    Examples:
      | nameOfObject | labelInput       | output                         |
      | precision0   | 1                | 1                              |
      | precision0   | 134^             | 134^                           |
      | precision0   | 1234567789       | 1,234,567,789                  |
      | precision0   | ,,,,,            | ,,,,,                          |
      | precision0   | .....            | .....                          |
      | precision0   | abc,.123,.!@.00  | abc,.123,.!@.00                |
      | precision0   | 1,234$           | 1,234$                         |
      | precision1   | 1                | 1.0                            |
      | precision1   | 1.2              | 1.2                            |
      | precision1   | 1.23             | 1.23                           |
      | precision2   | 2                | 2.00                           |
      | precision2   | 2.1              | 2.10                           |
      | precision2   | 2.12             | 2.12                           |
      | precision2   | 2.123            | 2.123                          |
      | precision3   | 2.1              | 2.100                          |
      | precision3   | 2.12             | 2.120                          |
      | precision3   | 2.123            | 2.123                          |
      | precision3   | 2.1234           | 2.1234                         |
      | precision4   | 1.1234           | 1.1234                         |
      | precision4   | 2                | 2.0000                         |
      | precision4   | 234556654        | 234,556,654.0000               |
      | precision4   | %^%^%<<,,,       | %^%^%<<,,,                     |
      | precision5   | 1                | 1.00000                        |
      | precision5   | 1.12345          | 1.12345                        |
      | precision5   | 1a.23            | 1a.23                          |
      | precision6   | 2.123456         | 2.123456                       |
      | precision6   | 2.1              | 2.100000                       |
      | precision6   | 2a.12            | 2a.12                          |
      | precision6   | 1,232.123        | 1,232.123000                   |
      | precision7   | 1                | 1.0000000                      |
      | precision7   | 2344.1234567     | 2,344.1234567                  |
      | precision7   | 88652344.1234567 | 88,652,344.1234567             |
      | precision8   | 1                | 1.00000000                     |
      | precision8   | 1.2              | 1.20000000                     |
      | precision8   | 1.23             | 1.23000000                     |
      | precision9   | 2                | 2.000000000                    |
      | precision9   | 2.1              | 2.100000000                    |
      | precision9   | 1222.12          | 1,222.120000000                |
      | precision9   | 2.123000000      | 2.123000000                    |
      | precision10  | 2.1              | 2.1000000000                   |
      | precision10  | 2.12             | 2.1200000000                   |
      | precision10  | 1222.123         | 1,222.1230000000               |
      | precision10  | 2.12345          | 2.1234500000                   |
      | precision11  | 1                | 1.00000000000                  |
      | precision11  | 2345             | 2,345.00000000000              |
      | precision11  | 17899536472345   | 17,899,536,472,345.00000000000 |
      | precision12  | 1                | 1.000000000000                 |
      | precision12  | 1.12345          | 1.123450000000                 |
      | precision12  | 1a.23            | 1a.23                          |
      | precision13  | 2                | 2.0000000000000                |
      | precision13  | 2.1              | 2.1000000000000                |
      | precision13  | 2a.12            | 2a.12                          |
      | precision13  | 1232.123         | 1,232.1230000000000            |
      | precision14  | 2.1              | 2.10000000000000               |
      | precision14  | 2.12             | 2.12000000000000               |
      | precision14  | 2.123            | 2.12300000000000               |
      | precision14  | 1222.1234        | 1,222.12340000000000           |
      | precision15  | 1                | 1.000000000000000              |
      | precision15  | 2332.78          | 2,332.780000000000000          |
      | precision15  | 1a3.55           | 1a3.55                         |
      | precision15  | 1.12345          | 1.123450000000000              |
      | precision15  | 1a.23            | 1a.23                          |
