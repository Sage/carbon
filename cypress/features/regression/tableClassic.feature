Feature: Table classic component
  I want to change Table classic component properties

  Background: Open Table component page classic
    Given I open "Table" component page classic

  @positive
  Scenario Outline: TotalRecords is set to <totalRecords>
    When I set totalRecords to "<totalRecords>"
      And I check paginate checkbox
    Then Table classic totalRecords is set to "<totalRecords>" records
    Examples:
      | totalRecords |
      | 0            |
      | 1            |
      | 10           |
      | 100          |
      | 99999999     |
      | -1           |
      | -10          |

  @positive
  Scenario Outline: TotalRecords is set out of scope to <totalRecords>
    When I set totalRecords to "<totalRecords>"
      And I check paginate checkbox
    Then Table classic totalRecords is set to "" records
    Examples:
      | totalRecords            |
      | Sample text             |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |